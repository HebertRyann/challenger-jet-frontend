import React, { useCallback, useState } from 'react';
import { Footer } from '../../../../footer';
import { Container, IconRemove } from './style';
import { NewInput } from '../../../../../../../../../../components/NewInput';
import { NewSelect } from '../../../../../../../../../../components/NewSelect';
import { useTabCreate } from '../../../../../providers/tabsProvider';
import { Alert } from '../../../../../../../../../../components/Alert';
import { SALE, RE_SALE } from '../../../DataOverview/products';
import { ResponseEntiryWithIdNameWithChildren } from '../../../../../services/api';

type TypeUnitMensured = {
  id: string;
  name: string;
};

type TypeAtributes = {
  id: string;
  name: string;
  parent_id: string | null;
  childrenList: ResponseEntiryWithIdNameWithChildren[];
  isChecked?: boolean;
};

type TypeTableProps = {
  unitMensuredList: TypeUnitMensured[];
  atributes: TypeAtributes[];
};

export const Table = ({
  unitMensuredList,
  atributes,
}: TypeTableProps): JSX.Element => {
  const [alert, setAlert] = useState(false);
  const { variation, overview } = useTabCreate();
  const { typeSelectProdut } = overview.getData();
  const variationList = variation.getData();
  const {
    changeCurrentStock,
    changePriceCost,
    changePriceSale,
    changeUnitMensured,
    addVariation,
    removeVariation,
  } = variation.setData;

  const handleClickOnSaveButton = () => {
    if (variation.validate()) {
      setAlert(true);
    }
  };

  const handlerClickAlertConfirm = useCallback(() => {
    setAlert(false);
  }, [alert]);

  return (
    <Container className="table-responsive">
      <table className="table table-bordered margin-bottom-0">
        <tbody>
          <tr>
            <th>Unidade de medidas</th>
            <th>Estoque atual</th>
            {atributes.map(
              ({ name, parent_id }) => parent_id === null && <th>{name}</th>,
            )}
            {typeSelectProdut.value.name === SALE.name ||
            typeSelectProdut.value.name === RE_SALE.name ? (
              <th colSpan={2}>Preço</th>
            ) : null}
            <th>Ações</th>
          </tr>
          {variationList.map(
            ({ unitMensured, currentStock, priceSale, priceCost }, index) => (
              <tr>
                <td>
                  <NewSelect
                    onChange={event => {
                      const split = event.target.value.split('+');
                      const id = split[0];
                      const name = split[1];
                      changeUnitMensured({ id, name }, index);
                    }}
                    name="unitMensured"
                    className="form-control top"
                    error={unitMensured.error}
                  >
                    {unitMensuredList.map(({ id, name }) => (
                      <option value={`${id}+${name}`}>{name}</option>
                    ))}
                  </NewSelect>
                </td>
                <td>
                  <NewInput
                    name="currentStock"
                    value={currentStock.value}
                    error={currentStock.error}
                    onKeyPress={event => {
                      const regex = /^[0-9]+$/;
                      if (!regex.test(event.key)) event.preventDefault();
                    }}
                    onChange={event =>
                      changeCurrentStock(event.currentTarget.value, index)
                    }
                    className="form-control top"
                    type="text"
                  />
                </td>
                <>
                  {atributes.map(
                    ({ parent_id, childrenList }, index) =>
                      parent_id === null && (
                        <td key={Math.random()}>
                          <NewSelect
                            className="form-control top"
                            name="Selecione"
                            id="Selecione"
                          >
                            {childrenList.map(({ name }) => (
                              <option value={name}>{name}</option>
                            ))}
                          </NewSelect>
                        </td>
                      ),
                  )}
                </>
                {typeSelectProdut.value.name === SALE.name ||
                typeSelectProdut.value.name === RE_SALE.name ? (
                  <>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <th>Custo</th>
                      </tr>
                      <tr>
                        <NewInput
                          name="cost"
                          value={priceCost.value}
                          error={priceCost.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/;
                            if (!regex.test(event.key)) event.preventDefault();
                          }}
                          onChange={event =>
                            changePriceCost(event.currentTarget.value, index)
                          }
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                    <td style={{ width: '150px' }}>
                      <tr>
                        <th>Venda</th>
                      </tr>
                      <tr>
                        <NewInput
                          name="priceSale"
                          disabled
                          defaultValue={priceSale.value}
                          error={priceSale.error}
                          placeholder="0.00"
                          onKeyPress={event => {
                            const regex = /^[0-9.]+$/;
                            if (!regex.test(event.key)) event.preventDefault();
                          }}
                          onChange={event =>
                            changePriceSale(event.currentTarget.value, index)
                          }
                          className="form-control"
                          type="text"
                        />
                      </tr>
                    </td>
                  </>
                ) : null}
                <td className="actions">
                  <IconRemove
                    className="top"
                    onClick={() => removeVariation(index)}
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <hr />
      <button
        onClick={() => {
          addVariation();
          console.log(variation.getData());
        }}
        className="btn dark btn-sm sbold uppercase"
      >
        <span
          className="fa fa-plus"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        variação
      </button>

      <div style={{ margin: '20px 0px 0 0' }}>
        <Footer onSave={handleClickOnSaveButton} />
      </div>
      <Alert
        isActive={alert}
        onlyConfirm
        message="Os campos destacados são de preenchimento obrigatório"
        onClickConfirmButton={handlerClickAlertConfirm}
      />
    </Container>
  );
};
