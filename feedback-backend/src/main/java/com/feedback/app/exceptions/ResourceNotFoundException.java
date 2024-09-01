package com.feedback.app.exceptions;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException{

    private String FieldName;
    private String FieldType;
    private Long FieldValue;

    public ResourceNotFoundException(String FieldName, String FieldType, Long FieldValue){
        super(String.format("%s not found with %s : %s", FieldName, FieldType, FieldValue));
        this.FieldName = FieldName;
        this.FieldType = FieldType;
        this.FieldValue = FieldValue;
    }
}
