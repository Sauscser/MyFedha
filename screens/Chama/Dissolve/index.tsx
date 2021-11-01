import React, {useEffect, useState} from 'react';

import {  updateCompany, updateGroup, updateGrpMembers} from '../../../src/graphql/mutations';
import {  getCompany, getGroup, getGrpMembers, getSMAccount } from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';


  


const DissolveChm = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[ownr, setownr] = useState(null);
  const[names, setName] = useState(null);
  
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    
    setName(userInfo.username);
    setownr(userInfo.attributes.sub);
      
  };
  useEffect(() => {
    fetchUser();
  }, []);

  
        const fetchCompDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                const ttlActiveChms = compDtls.data.getCompany.ttlActiveChm                
                const ttlInactvChms = compDtls.data.getCompany.ttlInactvChm
               

                const ftchChmDtls = async () =>{
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    try{
                      const compDtls :any= await API.graphql(
                        graphqlOperation(getGroup,{grpContact:groupCnt})
                        );
                        const signitoryPWs = compDtls.data.getGroup.signitoryPW
                        const grpNames = compDtls.data.getGroup.grpName
                        const owners = compDtls.data.getGroup.owner
                        const ttlNonLonsRecChms = compDtls.data.getGroup.ttlNonLonsRecChm
                        const ttlNonLonsSentChms = compDtls.data.getGroup.ttlNonLonsSentChm
                        const grpBals = compDtls.data.getGroup.grpBal
                        

                        const updateComp = async()=>{
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateCompany,{
                                                input:{
                                                  AdminId: "BaruchHabaB'ShemAdonai2",
                                                  ttlActiveChm:parseFloat(ttlActiveChms) - 1,
                                                  ttlInactvChm:parseFloat(ttlInactvChms) + 1,
                                                  
                                                }
                                              })
                                            )
                                        }
                                        catch(error){
                                          if(error){
                                            Alert.alert("Check internet; otherwise chama doesnt exist")
                                            return;
                                          }
                                        }
                                          setIsLoading(false)
                                        await updtChmDtls();
                                      }
                                      if(ttlNonLonsRecChms>ttlNonLonsSentChms)
                                      {
                                          Alert.alert("Chama has Members Money");
                                      }
                                      
                                      else if(signitoryPWs!==SigntryPW)
                                      {
                                          Alert.alert("Wrong signitory password");
                                      }

                                      else if(ownr!==owners)
                                      {
                                          Alert.alert("You are not the author of the Chama");
                                      }

                                      else if(grpBals>0)
                                      {
                                          Alert.alert("Chama has money in its account");
                                      }
                                      else {updateComp();}
                          
                                      const updtChmDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  status:"AccountInactive"
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Please internet; otherwise group doesnt exist")
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(names +" has dissolved "+grpNames+" Chama");
                                      } 

        
                    } catch (error) {
                        if(error){
                          Alert.alert("Check internet; otherwise Chama doesnt exist")
                          return
                        }
                      }}
                      await ftchChmDtls();

            } catch (error) {
                if(error){
                  Alert.alert("Check internet; otherwise Chama doesnt exist")
                  return
                }
              }

              
           

            setIsLoading(false);
              setgroupCnt("");
              setSigntryPW("")
          
            }
        
        useEffect(() =>{
          const groupCnts=groupCnt
            if(!groupCnts && groupCnts!=="")
            {
              setgroupCnt("");
              return;
            }
            setgroupCnt(groupCnts);
            }, [groupCnt]
             );

             useEffect(() =>{
                const SigntryPWs=SigntryPW
                  if(!SigntryPWs && SigntryPWs!=="")
                  {
                    setSigntryPW("");
                    return;
                  }
                  setSigntryPW(SigntryPWs);
                  }, [SigntryPW]
                   );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Chama Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="+2547xxxxxxxx"
                      value={groupCnt}
                      onChangeText={setgroupCnt}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Phone</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SigntryPW}
                      onChangeText={setSigntryPW}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Signitory PassWord</Text>
                  </View>       
                  
        
                  <TouchableOpacity
                    onPress={fetchCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to dissolve Chama
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default DissolveChm;