import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import ChamInfo from "../../../../components/Chama/GeneralInfo";
import styles from './styles';

import { useRoute } from '@react-navigation/native';
import { getCompany, getSMAccount, listGroups } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';

const FetchSMCovLns = props => {
  const[SenderEmail, setSenderEmail] = useState(null);
    const[LnerPhn, setLnerPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Chm, setChm] = useState([]);

    const route = useRoute();

    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
            
      setSenderEmail(userInfo.attributes.email);
           
    };
    

    useEffect(() => {
        fetchUser();
      }, []);
   

        const fetchChm = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listGroups, 
                { filter: {
                    and: {
                      grpContact: { eq: route.params.grpContact},
                      status: { eq: "AccountActive"},
                    }
                  }}
                  ));
              setChm(Lonees.data.listGroups.items);

              const fetchUsrDtls = async () => {
                try {
                        const MFNDtls: any = await API.graphql(
                            graphqlOperation(getSMAccount, {awsemail: SenderEmail}
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
                                                updtUsrAc();
                                                
                                              }
          
                                              const updtUsrAc = async()=>{
                                                
                                                try{
                                                    await API.graphql(
                                                      graphqlOperation(updateSMAccount,{
                                                        input:{
                                                          awsemail: SenderEmail,
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
                      return;
                    }
                    else{
                        
                      updtActAdm();
                        }
                        
                          }
                      catch (e)
                      {
                        if(e){
                          Alert.alert("User does not exist does not exist; otherwise check internet connection");
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
                          Alert.alert("User does not exist; otherwise check internet connection");
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
            fetchChm();
          }, [])

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Chm}
        renderItem={({item}) => <ChamInfo ChmDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchChm}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Chama Info</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;