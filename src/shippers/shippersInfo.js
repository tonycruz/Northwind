export class ShipperInfo {
    shipperID;
    companyName;
    phone;
    validation;
    static getJson(shipper) {
        return {
            "shipperID": shipper.shipperID,
            "companyName": shipper.companyName,
            "phone": shipper.phone
        }
    }
    static Validate(shipper, validation) {
        shipper.validation = validation.on(shipper)
            .ensure("companyName")
                .isNotEmpty()
                .hasMaxLength(40)
            .ensure("phone")
                .isNotEmpty()
                .hasMaxLength(24);
    }
}


