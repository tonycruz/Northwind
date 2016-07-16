export class Welcome {
    header = 'Welcome to Aurelia!';
    firstName = 'Antonio';
    lastName = 'Cruz';
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
    submit(){
        alert(`Welcome, ${this.fullName}!`);
    }
}