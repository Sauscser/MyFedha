import React, {useState,useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';

import { API, graphqlOperation,  Auth} from 'aws-amplify';
import NonLnSent from "../../../components/Advocate/VwAdvWthdrwls";
import styles from './styles';


import { getCompany, getSMAccount, vwAdvWthdrwls,  } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const [Email, setEmail] = useState(null); 
    const route = useRoute();

    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      
      setEmail(userInfo.attributes.email);
       
    };
  
    useEffect(() => {
        fetchUser();
      }, []);
    

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(vwAdvWthdrwls, 
         {
                      advregnu: route.params.AdvReNo,
                      sortDirection: "DESC",
                      limit:100
                      
                    }
                 
                  ));
                  setRecvrs(Lonees.data.VwAdvWthdrwls.items);

                  const fetchUsrDtls = async () => {
                    try {
                            const MFNDtls: any = await API.graphql(
                                graphqlOperation(getSMAccount, {awsemail: Email}
                            ),);
              
                            const balances = MFNDtls.data.getSMAccount.balance;
                            
                            const fetchCompDtls = async () => {
                              try {
                                      const MFNDtls: any = await API.graphql(
                                          graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                                      ),);
                      
                                      const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
                                      const companyEarnings = MFNDtls.data.getCompany.companyEarning;
                                      const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
                                      
                                      
                                                  const updtActAdm = async()=>{
                                                    
                                                    try{
                                                        await API.graphql(
                                                          graphqlOperation(updateCompany,{
                                                            input:{
                                                              AdminId:"BaruchHabaB'ShemAdonai2",
                                                              companyEarningBal:parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                                                              companyEarning:parseFloat(companyEarnings) + parseFloat(enquiryFees),
                                                            }
                                                          })
                                                        )
                                                    }
                                                    catch(error){
                                                      if(error){
                                                        Alert.alert("Check your internet connection")
                                                        return;
                                                    }
                                                    }
                                                    await updtUsrAc();
                                                    
                                                  }
              
                                                  const updtUsrAc = async()=>{
                                                    
                                                    try{
                                                        await API.graphql(
                                                          graphqlOperation(updateSMAccount,{
                                                            input:{
                                                              awsemail:Email,
                                                              balance:parseFloat(balances) - parseFloat(enquiryFees),
                                                            }
                                                          })
                                                        )
                                                    }
                                                    catch(error){
                                                      if(error){
                                                        Alert.alert("User does not exist")
                                                        return;
                                                    }
                                                    }
                                                    
                                                  }
                              
              
              
                              
              
                      if(parseFloat(balances) < parseFloat(enquiryFees) ){
                          Alert.alert("Account Balance is very little");
                        }
                        else{
                            
                          await updtActAdm();
                            }
                            
                              }
                          catch (e)
                          {
                            if(e){
                              Alert.alert("Advocate does not exist; otherwise check internet connection");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                  
                           }
                           await fetchCompDtls();
              
                          }
              
                          catch (e)
                          {
                            if(e){
                              Alert.alert("Advocate does not exist; otherwise check internet connection");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                          
                           }
                           await fetchUsrDtls();
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            fetchLoanees();
          }, [])      

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recvrs}
        renderItem={({item}) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Withdrawals</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;