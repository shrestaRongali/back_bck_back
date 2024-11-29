import { BaseApp } from "@AppLib/app/baseApp";

export class DefaultService {

	private _appObj: BaseApp;

	constructor() {
		this._appObj = EXPRS;
	}

	getAppObj(): BaseApp {
		return this._appObj;
	}
}
