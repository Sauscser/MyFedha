import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
        id:string,
        grpContact: string,
        amountGiven: number,
        amountExpectedBack: number,
        amountExpectedBackWthClrnc:number,
        amountRepaid: number,
        lonBala: number,
        repaymentPeriod: number,
        advRegNu: string,
        status: string,
        description: string,
        LoanerName:string,
        createdAt:string,
        updatedAt:string,
        
    }}

const ChmCvLnSttsRec = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
    id,
    
    amountGiven,
    amountExpectedBack,
    amountExpectedBackWthClrnc,
    amountRepaid,
    lonBala,
    repaymentPeriod,
    advRegNu,
    status,
    LoanerName,
    description,
    grpContact,
    createdAt,
    updatedAt,
   }} = props ;
    return (
        <View style = {styles.container}>              
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.loanAdvert}>                       
                       {/*loaner details */}   
                       {LoanerName}               
                    </Text>
            </View>
            
            <ScrollView >              
                       
                        

                    
                     <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loan Id: {id}                 
                    </Text>
                    
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Amount Given (Ksh): {amountGiven.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Amount Expected Back(Ksh): {amountExpectedBack.toFixed(2)}
                    </Text>   
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Amount Expected Back with Clearance fee(Ksh): {amountExpectedBackWthClrnc.toFixed(2)}
                    </Text>   
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                       Amount Repaid(Ksh): {amountRepaid.toFixed(2)}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Loan Balance(Ksh): {lonBala.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Repayment Period in days: {repaymentPeriod}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Group Contact: {grpContact}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Advocate Registration Number: {advRegNu}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Loan Status: {status}                    
                    </Text> 
                    <ScrollView>
                    <Text style = {styles.loanerotherdescriptions} >                       
                       {/* other description*/} 
                       Created At: {createdAt}                 
                    </Text>   
                    <Text style = {styles.loanerotherdescriptions} >                       
                       {/* other description*/} 
                       Last Update: {updatedAt}                 
                    </Text>   
                    <Text style = {styles.loanerotherdescriptions} >                       
                       {/* other description*/} 
                       More: {description}                 
                    </Text>   
                    </ScrollView>              
            
                
                
            
        </ScrollView>
                
        </View>
    );
}; 

export default ChmCvLnSttsRec