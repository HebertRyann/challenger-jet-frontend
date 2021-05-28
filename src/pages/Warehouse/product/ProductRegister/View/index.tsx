import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { FormCategory } from '../components/Form';
import Container from '../../../../../components/Container';
import api from '../../../../../services/api';
import { useToast } from '../../../../../hooks/toast';
import Modal from '../../../../../components/Modal';
import { useLoading } from '../../../../../hooks/loading';
import { Alert } from '../../../../../components/Alert';
import { useUpdateDataTable } from '../../../../../hooks/dataTable';
import { nameActions, namePageTitle } from '../domain/info';
import { apiDelete, apiList } from '../domain/api';
import { breadcrumbView } from '../domain/breadcrumb';
import {
  toolsViewCreate,
  toolsViewDelete,
  toolsViewUpdate,
  toolsViewList,
} from '../domain/tools';
import { Content } from './Content';
import { TabsProvider } from '../../../../../hooks/tabs';
import { ProductProvider, useProduct } from './provider/productProvider';
import { ProductResponse } from './domain/response/productResponse';
import { Wrapper } from './styles';
interface ProductCategorytData {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

const ProductAtributesView: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation<{ id: string; value: string }>();
  const { updateDataTable } = useUpdateDataTable();

  const { addToast } = useToast();
  const [alert, setIsActiveAlert] = useState<{
    isActive: boolean;
    id: number;
    name: string;
  }>({
    id: 0,
    isActive: false,
    name: '',
  });

  const [
    currentItemUpdate,
    setCurrentItemUpdate,
  ] = useState<ProductCategorytData>({} as ProductCategorytData);
  const { setProduct, getProduct } = useProduct();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);

  const handleClickOnClose = useCallback(() => {
    setModalCreate(false);
    setModalEdit(false);
    updateDataTable();
  }, [modalCreate, modalEdit]);

  const refModal = useRef(null);
  const { disableLoading, activeLoading } = useLoading();

  useEffect(() => {
    async function loadCategory(): Promise<void> {
      activeLoading();
      try {
        const response = await api.get<ProductResponse>(
          apiList(location.state.id),
        );
        const { data } = response;
        setProduct(data);
        disableLoading();
      } catch (err) {
        disableLoading();
        addToast({
          type: 'error',
          title: 'Error ao carregar a categoria',
          description:
            'Houve um error ao carregar a categoria, tente novamente mais tarde!',
        });
      }
    }
    loadCategory();
  }, [id, addToast]);

  const handlerClickButtonCancellAlert = useCallback(() => {
    setIsActiveAlert({
      id: 0,
      isActive: false,
      name: '',
    });
    addToast({
      type: 'info',
      title: 'Operação cancelada.',
    });
  }, [alert]);

  const handlerClickButtonConfirmAlert = useCallback(
    async (id: string) => {
      try {
        await api.delete(apiDelete(id));
        setIsActiveAlert({
          id: 0,
          isActive: false,
          name: '',
        });
        addToast({
          type: 'success',
          title: 'Produto removido com sucesso.',
        });
      } catch (err) {
        setIsActiveAlert({
          id: 0,
          isActive: false,
          name: '',
        });
        addToast({
          type: 'error',
          title: 'O produto não removido, pois ainda está sendo usada.',
        });
      }
    },
    [alert],
  );

  const [alertRemoveParent, setAlertRemoveParent] = useState(false);

  const handleOnClickRemoveParent = useCallback(
    ({ id, name }: { id: string; name: string }) => {
      setAlertRemoveParent(true);
    },
    [alertRemoveParent],
  );

  const handlerOnClickButtonConfirmRemoveParent = useCallback(
    async (id: number) => {
      try {
        await api.delete(apiDelete(String(id)));
        setAlertRemoveParent(false);
        addToast({
          type: 'success',
          title: 'Atributo removido com sucesso.',
        });
        history.goBack();
      } catch (err) {
        setAlertRemoveParent(false);
        addToast({
          type: 'error',
          title: 'Produto não pode ser removido, pois ainda está em uso.',
        });
      }
    },
    [alertRemoveParent],
  );

  const handlerOnClickButtonCancelRemoveParent = useCallback(() => {
    setAlertRemoveParent(false);
  }, []);

  const product = getProduct();

  return (
    <Wrapper>
      <Container
        pageTitle={namePageTitle}
        portletTitle={nameActions.read.name}
        breadcrumb={breadcrumbView}
        tools={[
          toolsViewUpdate(String(id)),
          toolsViewDelete(() => {
            handleOnClickRemoveParent({
              id: String(product?.id),
              name: String(product?.name),
            });
          }),
          toolsViewCreate(),
          toolsViewList(),
        ]}
      >
        <div className="form-body">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="id" className="control-label">
                  Cód.
                </label>
                <p>{product.id}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="control-label">
                  Nome
                </label>
                <p>{product.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="created" className="control-label">
                  Cadastrado em
                </label>
                <p>{product.created_at}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="updated" className="control-label">
                  Atualizado em
                </label>
                <p>{product.updated_at}</p>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="id" className="control-label">
                  Tipo do produto
                </label>
                <p>
                  {product?.type?.toLocaleUpperCase() === 'CONSUMO'
                    ? 'USO E CONSUMO'
                    : product.type}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="control-label">
                  Grupo do produto
                </label>
                <p>{product?.product_category?.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="created" className="control-label">
                  Categoria de custo
                </label>
                <p>{product.financial_category?.name}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="updated" className="control-label">
                  Subcategoria custo
                </label>
                <p>{product.subfinancial_category?.name}</p>
              </div>
            </div>
          </div>
          <p>&nbsp;</p>
          <div className="row">
            <div className="col-md-12">
              <TabsProvider>
                <Content />
              </TabsProvider>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        isOpenModal={modalCreate}
        pageTitle={'Adicionar'}
        Children={
          <FormCategory
            typeForm={'create'}
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(id),
            }}
          />
        }
      />
      <Modal
        refModal={refModal}
        onClickButtonCancel={handleClickOnClose}
        isOpenModal={modalEdit}
        pageTitle={'Editar'}
        Children={
          <FormCategory
            valueInput={currentItemUpdate.name}
            typeForm={{
              idUpdate: currentItemUpdate.id,
              inputValue: currentItemUpdate.name,
            }}
            isOpenInModal={{
              handleOnClose: handleClickOnClose,
              idParent: Number(id),
            }}
          />
        }
      />
      <Alert
        message={`Tem certeza que deseja excluir o registro ${product?.name} ?`}
        onClickCancellButton={handlerOnClickButtonCancelRemoveParent}
        onClickConfirmButton={() =>
          handlerOnClickButtonConfirmRemoveParent(Number(product?.id))
        }
        isActive={alertRemoveParent}
      />
    </Wrapper>
  );
};

const ProductHOC = () => (
  <ProductProvider>
    <ProductAtributesView />
  </ProductProvider>
);

export default ProductHOC;
