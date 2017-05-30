import { IConnection, IOptions, ResponseType } from "../connection";
import { ESPConnection } from "../espConnection";
export class EclService {
    private _connection: ESPConnection;

    constructor(optsConnection: IOptions | IConnection) {
        this._connection = new ESPConnection(optsConnection, "WsEcl", "0");
    }

    requestSchema(querySet: string, queryId: string) {
        return this._connection.send(`definitions/query/${querySet}/${queryId}/main/${queryId}`, {}, ResponseType.XSD);
    }

    responseSchema(querySet: string, queryId: string, resultName: string) {
        return this._connection.send(`definitions/query/${querySet}/${queryId}/result/${resultName}`, {}, ResponseType.XSD);
    }

    submit(querySet: string, queryId: string, request: object) {
        // http://192.168.3.22:8002/WsEcl/submit/query/roxie/peopleaccounts.1/json
        return this._connection.send(`submit/query/${querySet}/${queryId}`, request, ResponseType.JSON2).then(response => {
            return response.Results;
        });
    }
}
