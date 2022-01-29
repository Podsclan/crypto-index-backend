export interface IQuotationRepository {
    updateQuotation(currenciesJson: String): Promise<void>;
}