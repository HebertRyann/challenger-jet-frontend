export type TypeGetAndSetAndValidateAba<T> = {
  getData: () => T;
  setData: (data: T) => void;
  validate: () => boolean;
};

export type FieldWithIdName = {
  id: string;
  name: string;
};

export type EntityWithIdAndNameFieldAndParentId = {
  id: string;
  name: string;
  parent_id: string | null;
};

export type TypeErroProps = {
  isError: boolean;
};

export type HasVariation = {
  hasVariation?: boolean;
  name: string;
};

export type TypeGenericValueWithError<T> = {
  value: T;
  error: TypeErroProps;
};

export type TypeValidationResult = {
  labelName: string;
  linkName: string;
};

export type TypeValitionResolve = {
  validate: () => TypeValidationResult[];
};

export type TypeDataOverViewProps = {
  typeSelectProdut: TypeGenericValueWithError<FieldWithIdName>;
  categoryCost: TypeGenericValueWithError<FieldWithIdName>;
  subCategoryCost: TypeGenericValueWithError<FieldWithIdName>;
  groupProduct: TypeGenericValueWithError<FieldWithIdName>;
  hasVariation: TypeGenericValueWithError<HasVariation>;
  nameProduct: TypeGenericValueWithError<string>;
};

export type TypeValueAndError = {
  value: string;
  error: TypeErroProps;
};

export type TypeDetailsProps = {
  weight: TypeValueAndError;
  width: TypeValueAndError;
  height: TypeValueAndError;
  length: TypeValueAndError;
  descriptionAndDetails: TypeValueAndError;
  technicalSpecification: TypeValueAndError;
  wayOfUse: TypeValueAndError;
};

export type TypeStockProps = {
  unitMensured: TypeGenericValueWithError<FieldWithIdName>;
  stockCurrent: TypeValueAndError;
  priceCost: TypeValueAndError;
  priceSale: TypeValueAndError;
};

export type TypePriceCompositionProps = {
  profit: TypeValueAndError;
  ipi: TypeValueAndError;
  cost: TypeValueAndError;
  dif: TypeValueAndError;
};

export type TypeHasVariation = {
  unitMensured: TypeGenericValueWithError<FieldWithIdName>;
  currentStock: TypeValueAndError;
  priceCost: TypeValueAndError;
  priceSale: TypeValueAndError;
  variations: TypeGenericValueWithError<FieldWithIdName>[];
};

// DATAOVERVIEW
export type ResolverDataOverView = {
  changeTypeProduct: (typeProduct: FieldWithIdName) => void;
  changeCategoryCost: (categoryCost: FieldWithIdName) => void;
  changeSubCategoryCost: (subCategoryCost: FieldWithIdName) => void;
  changeGroupProduct: (groupProduct: FieldWithIdName) => void;
  changeNameProduct: (nameProduct: string) => void;
  changeHasVariation: (hasVariation: HasVariation) => void;
};

export type TypeGetAndSetDataOverView<T> = {
  getData: () => T;
  setData: ResolverDataOverView;
  validate: () => boolean;
};
// VARIATION
export type ResolverHasVariation = {
  changeUnitMensured: (unitMensured: FieldWithIdName, index: number) => void;
  changeCurrentStock: (stock: string, index: number) => void;
  changePriceSale: (priceSale: string, index: number) => void;
  changePriceCost: (priceCost: string, index: number) => void;
  changeVariations: (variation: string, x: number, y: number) => void;
  addVariations: (variation: FieldWithIdName, x: number, y: number) => void;
  removeVariations: (x: number, y: number) => void;
  addVariation: () => void;
  removeVariation: (index: number) => void;
};

export type TypeGetAndSetHasVariation<T> = {
  getData: () => T;
  setData: ResolverHasVariation;
  validate: () => boolean;
};

export type TypeProduct = {
  nameProduct: TypeValueAndError;
  amount: TypeValueAndError;
  cost: TypeValueAndError;
  subtotal: TypeValueAndError;
};
// COMPOSITION
export type ResolverComposition = {
  changeInputNameProduct: (name: string, index: number) => void;
  changeInputAmount: (amount: string, index: number) => void;
  changeInputCost: (cost: string, index: number) => void;
  changeInputSubTotal: (subtotal: string, index: number) => void;
  addComposition: () => void;
  removeComposition: (index: number) => void;
};

export type TypeGetAndSetComposition<T> = {
  getData: () => T;
  setData: ResolverComposition;
  validate: () => boolean;
};
// FISCAL
export type ResolverFiscal = {
  changeNCM: (ncm: string) => void;
  changeCFOP: (cfop: string) => void;
  changeIcmsTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changeIcmsOrigem: (origem: FieldWithIdName) => void;
  changeIpiTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changePisTaxeIssue: (taxeIssue: FieldWithIdName) => void;
  changeCofinsTaxeIssue: (taxeIssue: FieldWithIdName) => void;
};

export type TypeFiscal = {
  ncm: TypeValueAndError;
  cfop: TypeValueAndError;
  icms: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
    origem: TypeGenericValueWithError<FieldWithIdName>;
  };
  ipi: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
  pis: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
  cofins: {
    taxesIssue: TypeGenericValueWithError<FieldWithIdName>;
  };
};

export type TypeGetAndSetFiscal<T> = {
  getData: () => T;
  setData: ResolverFiscal;
  validate: () => boolean;
};
