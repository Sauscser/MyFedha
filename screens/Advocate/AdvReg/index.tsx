import React, {useEffect, useState} from 'react';
import {Alert} from "react-native"

import {createAdvocate,  updateCompany} from '../../../src/graphql/mutations';

import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { getCompany, getSMAccount } from '../../../src/graphql/queries';

  const RegisterMFAdvAcForm = props => {

  const navigation = useNavigation();

  
  const [nationalId, setNationalid] = useState('');
  const [nam, setName] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const[eml, setEml] =useState("");
  const [ownr, setOwnr] = useState(null);
  const [pword, setPW] = useState('');
  const [advRegNo, setAdvRegNo] = useState('');
  const[officeLocs, setOfficeLoc] = useState("");
  const [BkName, setBkName] = useState('');
  const [BkAcNu, setBkAcNu] = useState('');
  const [isLoading, setIsLoading] =useState(false);
  const [UsrPhn, setUsrPhn] = useState(null);
  const [UsrEmail, setUsrEmail] = useState(null);
  
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();   
    setOwnr(userInfo.attributes.sub); 
    setUsrPhn(userInfo.attributes.phone_number);
    setUsrEmail(userInfo.attributes.email);
  };

    useEffect(() => {
    fetchUser();
   }, []);

   const gtCompDtls = async () =>{
     if(isLoading){
       return;
     }
     setIsLoading(true);
    try{
        const compDtls :any= await API.graphql(
          graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const actvAdv = compDtls.data.getCompany.ttlKFAdvActv

        const ChckUsrExistence = async () => {
          try {
            const UsrDtls:any = await API.graphql(
              graphqlOperation(getSMAccount, 
                { 
                  awsemail:UsrEmail
                }
              )
            )
            const nationalidssss = UsrDtls.data.getSMAccount.nationalid
        
        const CreateNewMFN = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try {
            await API.graphql(
              graphqlOperation(createAdvocate, {
                input: {                    
                  advregnu: advRegNo,
                  nationalid: nationalidssss,
                  pwd: pword,
                  name: nam,
                  phonecontact: phoneContact,
                  email: eml,
                  bankName:BkAcNu,
                  bkAcNo:BkName,
                  advBal: 0,
                  officeLoc: officeLocs,
                  TtlEarnings: 0,        
                  owner:ownr,
                  status: 'AccountActive',
                },
              }),
            );
            
          } 
          
          
          catch (error) {    
            console.log(error)   
            if(error)
          {Alert.alert("Not authorised to register as Advocate")
        return;} 
         
      
        } 
        
           await updtActAdm();
        setIsLoading(false);
        };
        CreateNewMFN();
        
      
      
        const updtActAdm = async()=>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
              await API.graphql(
                graphqlOperation(updateCompany,{
                  input:{
                    AdminId:"BaruchHabaB'ShemAdonai2",
                    ttlKFAdvActv:parseFloat(actvAdv) + 1,
                  }
                })
              )
          }
          catch(error){if(error){
            console.log(error)  
            Alert.alert("Check your internet")
            return;}
        }
        Alert.alert("Advocate "+advRegNo+ " successfully registered.")
        setIsLoading(false);     
      
      }

      
 

    } catch (e) {
      console.error(e);
      
      if(e){Alert.alert("Please first sign up")}
      
    }
  }

  await ChckUsrExistence();
   
        }

catch(e){
  if(e){
    console.log(e)  
    Alert.alert("Check your internet")
    return;
  }
};


setIsLoading(false);
setNationalid("");
setPW("");
setName("");
setEml("");
setAdvRegNo("");
setPhoneContact("");
setOfficeLoc("");
setBkAcNu("");
    setBkName("");

   }
    
   useEffect(() =>{
    const BkNames=BkName
      if(!BkNames && BkNames!=="")
      {
        setBkName("");
        return;
      }
      setBkName(BkNames);
      }, [BkName]
       );

       useEffect(() =>{
        const BkAcNus=BkAcNu
          if(!BkAcNus && BkAcNus!=="")
          {
            setBkAcNu("");
            return;
          }
          setBkAcNu(BkAcNus);
          }, [BkAcNu]
           );
           
           useEffect(() =>{
  const natid=nationalId
    if(!natid && natid!=="")
    {
      setNationalid("");
      return;
    }
    setNationalid(natid);
    }, [nationalId]
     );

     useEffect(() =>{
      const AVdPWs=pword
        if(!AVdPWs && AVdPWs!=="")
        {
          setPW("");
          return;
        }
        setPW(AVdPWs);
        }, [pword]
         );

         useEffect(() =>{
          const nym=nam
            if(!nym && nym!=="")
            {
              setName("");
              return;
            }
            setName(nym);
            }, [nam]
             );

             useEffect(() =>{
              const emyl=eml
                if(!emyl && emyl!=="")
                {
                  setEml("");
                  return;
                }
                setEml(emyl);
                }, [eml]
                 );

                 useEffect(() =>{
                  const phn=phoneContact
                    if(!phn && phn!=="")
                    {
                      setPhoneContact("");
                      return;
                    }
                    setPhoneContact(phn);
                    }, [phoneContact]
                     );

                     useEffect(() =>{
                      const AVdRegs=advRegNo
                        if(!AVdRegs && AVdRegs!=="")
                        {
                          setAdvRegNo("");
                          return;
                        }
                        setAdvRegNo(AVdRegs);
                        }, [advRegNo]
                         );

                         useEffect(() =>{
                          const officeLocss=officeLocs
                            if(!officeLocss && officeLocss!=="")
                            {
                              setOfficeLoc("");
                              return;
                            }
                            setOfficeLoc(officeLocss);
                            }, [officeLocs]
                             );

  return (
   
      <View
        
        style={styles.image}>
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Advocate Account Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={advRegNo}
              onChangeText={setAdvRegNo}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Licence Number</Text>
          </View>
          
          <View style={styles.sendLoanView}>
            <TextInput
            placeholder="+2547xxxxxxxx"
              value={phoneContact}
              onChangeText={setPhoneContact}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Phone</Text>
          </View>

          
          <View style={styles.sendLoanView}>
            <TextInput
              value={nam}
              onChangeText={setName}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Name</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={BkAcNu}
              onChangeText={setBkAcNu}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Bank Ac Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={BkName}
              onChangeText={setBkName}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Bank Name</Text>
          </View>


          <View style={styles.sendLoanView}>
            <TextInput
              value={eml}
              onChangeText={setEml}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Email</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={pword}
              onChangeText={setPW}
              style={styles.sendLoanInput}
              secureTextEntry = {true}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Pass Word</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={officeLocs}
              onChangeText={setOfficeLoc}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Advocate Office Location</Text>
          </View>
      
          <TouchableOpacity
            onPress={gtCompDtls}
            style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to Create Account
            </Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    
  );
};

export default RegisterMFAdvAcForm;