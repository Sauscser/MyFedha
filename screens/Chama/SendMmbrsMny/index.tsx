import React, {useEffect, useState} from 'react';

import {
  
  createSMLoansCovered,
  
  createSMLoansNonCovered,
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateGroup,
  
} from '../../.././src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getCompany,
  getGroup,
  getSMAccount,
  
} from '../../.././src/graphql/queries';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [SendrPhn, setSendrPhn] = useState("");  
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  
  

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    
  }

  useEffect(() => {
    fetchUser();
    }, []);  


  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(false);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getGroup, {grpContact: SendrPhn}),
      );

      const grpBals =accountDtl.data.getGroup.grpBal;
      const signitoryPWs =accountDtl.data.getGroup.signitoryPW;
      const statuss =accountDtl.data.getGroup.status;
      const SenderSub =accountDtl.data.getGroup.owner;
      const ttlNonLonsSentChms =accountDtl.data.getGroup.ttlNonLonsSentChm;
      
      const grpNames =accountDtl.data.getGroup.grpName;
      
      const fetchCompDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts);
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
          
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
         
          const ttlNonLonssSentChms = CompDtls.data.getCompany.ttlNonLonssSentChm; 
         
                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getSMAccount, {phonecontact: RecNatId}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getSMAccount.balance;                    
                    const usrAcActvSttss =RecAccountDtl.data.getSMAccount.acStatus; 
                    const ttlNonLonsRecSMs =RecAccountDtl.data.getSMAccount.ttlNonLonsRecSM;
                    const namess =RecAccountDtl.data.getSMAccount.name;
                    
                    
                  
                    const sendSMNonLn = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true)
                      try {
                        await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: SendrPhn,                                  
                              amount: amounts,                              
                              description: Desc,
                              status: "ChmSndMbr",
                              owner: ownr
                            },
                          }),
                        );


                      } catch (error) {
                        if(!error){
                          Alert.alert("Account deactivated successfully")
                          
                      } 
                      else{Alert.alert("Please check your internet connection")
                      return;}
                      }
                      setIsLoading(false);
                      await updtSendrAc();
                    };

                    const updtSendrAc = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateGroup, {
                              input:{
                                grpContact:SendrPhn,
                                ttlNonLonsSentChm: parseFloat(ttlNonLonsSentChms)+parseFloat(amounts),
                                grpBal:parseFloat(grpBals)-TotalTransacted 
                               
                                
                              }
                            })
                          )


                      }
                      catch(error){
                        if (error){Alert.alert("Check your internet connection")
                        return;}
                      }
                      setIsLoading(false);
                      await updtRecAc();
                    }

                    const updtRecAc = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                recPhn:RecNatId,
                                ttlNonLonsRecSM: parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts) ,
                                balance:parseFloat(RecUsrBal) + parseFloat(amounts)                                     
                                
                                                                  
                                
                              }
                            })
                          )                              
                      }
                      catch(error){
                        if (error){Alert.alert("Check your internet connection")
                        return;}
                      }
                      setIsLoading(false);
                      await updtComp();
                    }

                    const updtComp = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals),
                                companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings),                                                    
                                                  
                                ttlNonLonssSentChm: parseFloat(amounts) + parseFloat(ttlNonLonssSentChms),
                                
                              }
                            })
                          )
                          
                          
                      }
                      catch(error){
                        if (error){Alert.alert("Check your internet connection")
                    return;}
                      }
                      Alert.alert(grpNames + " has sent Ksh. " + amounts + " to " + namess);
                      setIsLoading(false);
                    }
                    
                                          
                    
                    if(statuss !== "AccountActive"){Alert.alert('Sender account is inactive');}
                    else if(usrAcActvSttss !== "AccountActive"){Alert.alert('Receiver account is inactive');}
                    else if(SendrPhn === RecNatId){Alert.alert('You cannot Send money to yourself Yourself');}
                    else if (
                      parseFloat(grpBals) < TotalTransacted 
                    ) {Alert.alert('Requested amount is more than you have in your account');}
                    
                    else if(signitoryPWs !==SnderPW){Alert.alert('Wrong password');}
                    else if(ownr !==SenderSub){Alert.alert('You are not the creator of this group');}
                    
                    
                    
                     else {
                      sendSMNonLn();
                    }                                                
                }       
                catch(e) {     
                  if (e){Alert.alert("Reciever does not exist")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchRecUsrDtls();
        } catch (e) {
          if (e){Alert.alert("Check your internet connection")
      return;}
        }
        setIsLoading(false);        
      };
      await fetchCompDtls();
    
      
    } catch (e) {
      if (e){Alert.alert("Sender does not exist")
      return;}
  };
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      setSendrPhn("");
      setDesc("");
      setSnderPW("");
      
}

useEffect(() =>{
  const SendrPhns=SendrPhn
    if(!SendrPhns && SendrPhns!=="")
    {
      setSendrPhn("");
      return;
    }
    setSendrPhn(SendrPhns);
    }, [SendrPhn]
     );

useEffect(() =>{
  const SnderNatIds=SenderNatId
    if(!SnderNatIds && SnderNatIds!=="")
    {
      setSenderNatId("");
      return;
    }
    setSenderNatId(SnderNatIds);
    }, [SenderNatId]
     );

     useEffect(() =>{
      const amt=amounts
        if(!amt && amt!=="")
        {
          setAmount("");
          return;
        }
        setAmount(amt);
        }, [amounts]
         );

         useEffect(() =>{
          const RecNatIds=RecNatId
            if(!RecNatIds && RecNatIds!=="")
            {
              setRecNatId("");
              return;
            }
            setRecNatId(RecNatIds);
            }, [RecNatId]
             );

             

                 

                     useEffect(() =>{
                      const descr=Desc
                        if(!descr && descr!=="")
                        {
                          setDesc("");
                          return;
                        }
                        setDesc(descr);
                        }, [Desc]
                         );

                         useEffect(() =>{
                          const SnderPWss=SnderPW
                            if(!SnderPWss && SnderPWss!=="")
                            {
                              setSnderPW("");
                              return;
                            }
                            setSnderPW(SnderPWss);
                            }, [SnderPW]
                             );

                             

                                 

  return (
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
              value={SendrPhn}
              onChangeText={setSendrPhn}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Chama Phone</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput
              value={RecNatId}
              onChangeText={setRecNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiver Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            keyboardType={"decimal-pad"}
              value={amounts}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
              editable={true}
              ></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput
              value={SnderPW}
              onChangeText={setSnderPW}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sender PassWord</Text>
          </View>

          

          <View style={styles.sendAmtViewDesc}>
            <TextInput
              multiline={true}
              value={Desc}
              onChangeText={setDesc}
              style={styles.sendAmtInputDesc}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <TouchableOpacity
            onPress={fetchSenderUsrDtls}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default SMASendNonLns;