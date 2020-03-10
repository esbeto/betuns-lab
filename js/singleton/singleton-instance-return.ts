// This is a newer approach but there's some boilerplate.
export class SingletonInstanceReturn {
  static instance: any;

  // Your properties
  api_url = '';

  constructor() {
    // If an instance exists, return it.
    if (SingletonInstanceReturn.instance) {
      return SingletonInstanceReturn.instance;
    }
    SingletonInstanceReturn.instance = this;

    // Your constructor code
    this.api_url = `http://localhost:${Math.random()}`;
    console.log('SingletonInstanceReturn: constructor called', this.api_url);
  }

  bar() {
    console.log(this.api_url);
  }
}
