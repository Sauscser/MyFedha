import React, {useEffect, useState} from 'react';

import {
  createFloatAdd,
   

  updateAgent,
  updateCompany,
  updateGroup,
  updateSAgent,
  updateSMAccount,
  
} from '../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getCompany, getGroup, getSAgent, getSMAccount} from '../../../src/graphql/queries';
import {
  View,
  Text,

  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';

const SMADepositForm = props => {
  const [WthDrwrEmail, setWthDrwrEmail] = useState(null);

  const[UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [grpKntct, setgrpKntct] = useState("");
  const [amount, setAmount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState(null);

  
  

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    setWthDrwrEmail(userInfo.attributes.email); 
  }

  useEffect(() => {
    fetchUser();
    }, []);  


  const fetchAcDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: WthDrwrEmail}),
      );

      
      const pws = accountDtl.data.getSMAccount.pw;
      

      const fetchChamaDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const ChmAcDtl:any = await API.graphql(
            graphqlOperation(getGroup, {grpContact: grpKntct}),
          );
    
          
          const owners = ChmAcDtl.data.getGroup.signitory2Sub;
          
      
                    const onChamaAc = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try {
                        await API.graphql(
                          graphqlOperation(updateGroup, {
                            input: {
                              grpContact: grpKntct,
                  
                              WithdrawCnfrmtn: "YES"
                              
                            },
                          }),
                        );
                      }
        
                      catch (error) {
                        console.log(error)
                        if (error){Alert.alert("Check internet Connection")
                        return;}
                      }
                      setIsLoading(false);
                      Alert.alert("Chama Withdrawal confirmed")
                    }

                    if (ownr!==owners) {
                      Alert.alert("Not authorised to confirm chama withdrawal")
                      return;
                    }  

                    
                    
                    else if (UsrPWd!==pws) {
                      Alert.alert("User credentials are wrong; access denied")
                      return;
                    } 
        
                    {onChamaAc()}   
        
        
                    } catch (error) {
                      console.log(error)
                  if (error){Alert.alert("Check your internet connection")
                          return;}
                    }
                    setIsLoading(false);
                    };    
        
                    await fetchChamaDtls();         
            
            
    }

    catch (e) {
      console.log(e)
      if (e){Alert.alert("Check your internet connection")
      return;}
          
     }       
    setIsLoading(false)
    
    setAmount("");
    setUsrPWd("")
    setgrpKntct("");    
  }; 

  

  useEffect(() =>{
    const grpKntcts=grpKntct
      if(!grpKntcts && grpKntcts!=="")
      {
        setgrpKntct("");
        return;
      }
      setgrpKntct(grpKntcts);
      }, [grpKntct]
       );
       
       useEffect(() =>{
        const amt=amount
          if(!amt && amt!=="")
          {
            setAmount("");
            return;
          }
          setAmount(amt);
          }, [amount]
           );

           useEffect(() =>{
            const UsrPWdss=UsrPWd
              if(!UsrPWdss && UsrPWdss!=="")
              {
                setUsrPWd("");
                return;
              }
              setUsrPWd(UsrPWdss);
              }, [UsrPWd]
               );

               useEffect(() =>{
                const agphn=AgentPhn
                  if(!agphn && agphn!=="")
                  {
                    setAgentPhn("");
                    return;
                  }
                  setAgentPhn(agphn);
                  }, [AgentPhn]
                   );

  

  


  return (
   
     
        
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>
      

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="+2547xxxxxxxx"
              value={grpKntct}
              onChangeText={setgrpKntct}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Chama Phone</Text>
          </View>

          

          <View style={styles.sendAmtView}>
            <TextInput
              value={UsrPWd}
              onChangeText={setUsrPWd}
              secureTextEntry = {true}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Signitory User PW</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to confirm Withdraw</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      
  );
};

export default SMADepositForm;