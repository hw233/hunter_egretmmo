declare module Zlib {
    export class Inflate {
        constructor(data:any, opt_params: any);
        decompress(): any;
     }
     
    export class Deflate { 
        constructor(data:any);
        compress():any;
    }
    
}
