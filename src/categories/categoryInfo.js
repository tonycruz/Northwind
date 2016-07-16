export class CategoryInfo {
  constructor(){
      this.categoryID ="0";
      this.categoryName = "";
      this.description ="";
      this.validation;  
    }
    static toJson(cat) {
        return {
            "categoryID": cat.categoryID,
            "categoryName": cat.categoryName,
            "description": cat.description,
            }
    }
    static Validate(cat, validation) {
        cat.validation = validation.on(cat)
            .ensure("categoryName")
               .isNotEmpty()
               .hasLengthBetween(5, 15)
            .ensure("description")
               .isNotEmpty()
               .hasLengthBetween(10, 50);
    }


}
