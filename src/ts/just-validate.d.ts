declare module "just-validate" {
    type ValidationRule = {
      rule: string;
      value?: number | string | RegExp;
      errorMessage?: string;
      validator?: (value: any, fields: any) => boolean;
    };
  
    type ValidationField = {
      selector: string;
      rules: ValidationRule[];
    };
  
    type ValidationOptions = {
      rules?: ValidationField[];
      messages?: { [selector: string]: string };
      submitHandler?: (form: HTMLElement, values: any) => void;
    };
  
    class JustValidate {
      constructor(selector: string, options?: ValidationOptions);
  
      addField(selector: string, rules: ValidationRule[]): this;
    }
  
    export default JustValidate;
  }