export class Welcome {
    constructor(){
     this.header = 'Welcome to Aurelia!';
     this.firstName = 'Antonio';
     this.lastName = 'Cruz';
    }
    
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
    submit(){
        alert(`Welcome, ${this.fullName}!`);
    }
}