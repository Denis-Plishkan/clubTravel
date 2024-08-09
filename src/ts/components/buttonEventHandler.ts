export class ButtonEventHandler<T> {
  buttonClass: string;
  instance: T;
  method: keyof T;

  constructor(buttonClass: string, instance: T, method: keyof T) {
    this.buttonClass = buttonClass;
    this.instance = instance;
    this.method = method;
    this.addButtonListener();
  }

  addButtonListener() {
    const button = document.querySelector<HTMLElement>(this.buttonClass);
    if (button) {
      button.addEventListener('click', () => {
        const method = this.instance[this.method] as unknown as () => void;
        method();
      });
    } else {
      console.error(`Button with class ${this.buttonClass} not found`);
    }
  }
}
