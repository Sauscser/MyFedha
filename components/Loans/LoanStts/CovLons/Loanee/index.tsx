import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
import styles from './styles';


export interface SMCvLnSttus {
    Loanee: {
        id:string,
        loaneePhn: string,
        amountgiven: number,
        amountexpected: number,
        amountrepaid: number,
        lonBala: number,
        repaymentPeriod: number,
        advregnu: string,
        loaneename:string,
        status: string,
        description: string,
        createdAt:string,
        updatedAt:string,
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
    id,
    loaneePhn,
    amountgiven,
    amountexpected,
    amountrepaid,
    lonBala,
    repaymentPeriod,
    advregnu,
    loaneename,
    status,
    description,
    createdAt,
    updatedAt,
   }} = props ;
    return (
        <View style = {styles.container}>              
            
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.loanAdvert}>                       
                       {/*loaner details */}   
                       {loaneename}               
                    </Text>
            </View>
             
            <ScrollView >              
                       
                        
            <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loan Id: {id}                 
                    </Text>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       LoaneePhone: {loaneePhn}                 
                    </Text>
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Amount Given (Ksh): {amountgiven.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Amount Expected Back(Ksh): {amountexpected.toFixed(2)}
                    </Text>   
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                       Amount Repaid(Ksh): {amountrepaid.toFixed(2)}                  
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
                      Advocate Registration Number: {advregnu}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Loan Status: {status}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Created At: {createdAt}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Last Update: {updatedAt}                    
                    </Text> 
                    <ScrollView>
                    <Text style = {styles.loanerotherdescriptions} >                       
                       {/* other description*/} 
                       Other Specifications: {description}                 
                    </Text>   
                    </ScrollView>              
            
                
                
            
        </ScrollView>
                
        </View>
    );
}; 

export default SMCvLnStts