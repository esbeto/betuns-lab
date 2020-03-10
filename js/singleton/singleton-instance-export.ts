// I really like this approach. It only exports the instance.
class SingletonInstanceExport {
  api_url = "";

  constructor() {
    this.api_url = `http://localhost:${Math.random()}`;
    console.log('SingletonInstanceExport: constructor called', this.api_url);
  }

  bar() {
    console.log(this.api_url);
  }
}

// Export a new instance of this class
export const foo = new SingletonInstanceExport();
