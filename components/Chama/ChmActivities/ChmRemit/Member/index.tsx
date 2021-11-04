import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, ImageBackground, Pressable, TextInput, ScrollView} from 'react-native';
import styles from './styles';


export interface MmbrContriInfo {
   memberContriDtls: {
     id: string,
     grpContact: string,
     
     SenderName:string,
     
     amountSent: number,
   
     description: string,
   
     status: string,
     createdAt:string,
     
   }}

const MmbrContriInfo = (props:MmbrContriInfo) => {
  const {
     memberContriDtls: {
        id,
        grpContact,
        
        SenderName,
        status,
        amountSent,
        createdAt,       
        description,
      
      
  }} = props ;

  const navigation = useNavigation;

  const TryChmLn = () => {
   navigation.navigate("ChmLnsGvnOuts", {grpContact});
  }
   return (
       <View style = {styles.container}>              
           
           
           <ScrollView >       
              

                    <Text style = {styles.ownerContact}>                       
                      {/*loaner details */}  
                      Transaction ID: {id}                
                   </Text>                                               
                   <Text style = {styles.ownerContact}>                       
                      {/*loaner details */}  
                    Chama Name: {SenderName}                
                   </Text>                     
                   <Text style ={styles.amountoffered}>                       
                      {/* amount*/} 
                      Amount (Ksh): {amountSent.toFixed(2)}
                   </Text>   
                   <Text style = {styles.repaymentPeriod}>                       
                      {/* repaymentPeriod*/}
                     Chama Phone: {grpContact}                  
                   </Text> 
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                      Time Sent: {createdAt}                    
                   </Text> 
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                     Status: {status}                    
                   </Text> 



                   
                   <ScrollView>
                   
                   <Text style = {styles.loanerotherdescriptions} >                       
                      {/* other description*/} 
                      More about Remittance: {description}                 
                   </Text>   
                   </ScrollView>              
           
               
               
           
       </ScrollView>
               
       </View>
   );
}; 

export default MmbrContriInfo