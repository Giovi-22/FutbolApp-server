
export interface DbAdapter{
    close(type:string):void,
    init(url:string):void
}
