export default interface IRequestBody {
	query: string;
	variables?: { [key: string]: any };
}
