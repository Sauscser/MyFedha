import React, {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/core';

import {
    createCvrdGroupLoans,
  createFloatAdd,
  createSMAccount,
  createSMLoansCovered,
  updateAdvocate,
  updateAgent,
  updateChamaMembers,
  updateCompany,
  updateGroup,
  
  updateReqLoanChama,
  
  updateSAgent,
  updateSMAccount,
  
} from '../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation, DataStore} from 'aws-amplify';
import {
  getAgent,
  getCompany,
  getSMAccount,
  getSAgent,
  getAdvocate,
  getGroup,
  
  getChamaMembers,
  getReqLoanChama,
} from '../../../../../src/graphql/queries';

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
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { parse } from 'expo-linking';

const ChmCovLns = props => {
  const [ChmPhn, setChmPhn] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [RecPhn, setRecPhn] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [RepaymtPeriod, setRepaymtPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [AmtExp, setAmtExp] = useState("");
  const [AdvRegNo, setAdvRegNo] = useState("");
  const [Desc, setDesc] = useState("");
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [RecAccCode, setRecAccCode] = useState("");
  const [SendrPhn, setSendrPhn] = useState(null);
  const [MmbrId, setMmbrId] = useState('');
  const [DfltPnlty, setDfltPnlty] = useState('');
  const route = useRoute();

  const ChmNMmbrPhns = MmbrId+ChmPhn

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    setSendrPhn(userInfo.attributes.phone_number);
  }

  useEffect(() => {
    fetchUser();
    }, []);  


    
    const fetchChmLoanReq = async () => {
      if(isLoading){
        return;
      }
      setIsLoading(true);
      try {
          const ChmMbrtDtlz:any = await API.graphql(
              graphqlOperation(getReqLoanChama, {id: route.params.id}),
              );
              const loaneeEmail =ChmMbrtDtlz.data.getReqLoanChama.loaneeEmail;
              const groupContacts =ChmMbrtDtlz.data.getReqLoanChama.chamaPhone;
              const memberContacts =ChmMbrtDtlz.data.getReqLoanChama.loaneePhone;
              const amount =ChmMbrtDtlz.data.getReqLoanChama.amount;
              const AmtExp =ChmMbrtDtlz.data.getReqLoanChama.repaymentAmt;
              const RepaymtPeriod =ChmMbrtDtlz.data.getReqLoanChama.repaymentPeriod;
              const loaneeMemberId =ChmMbrtDtlz.data.getReqLoanChama.loaneeMemberId;

              const ChmNMmbrPhns = loaneeMemberId+groupContacts
                         
const fetchChmMbrDtls = async () => {
      if(isLoading){
        return;
      }
      setIsLoading(true);
      try {
          const ChmMbrtDtl:any = await API.graphql(
              graphqlOperation(getChamaMembers, {ChamaNMember: ChmNMmbrPhns}),
              );

              
              const GrossLnsGvns =ChmMbrtDtl.data.getChamaMembers.GrossLnsGvn;
              const LonAmtGvens =ChmMbrtDtl.data.getChamaMembers.LonAmtGven;
              const LnBals =ChmMbrtDtl.data.getChamaMembers.LnBal;
              const AmtRepaids =ChmMbrtDtl.data.getChamaMembers.AmtRepaid;
                         


  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getGroup, {grpContact: groupContacts}),
      );

      const grpBals =accountDtl.data.getGroup.grpBal;
      const signitoryPWs =accountDtl.data.getGroup.signitoryPW;
      const statuss =accountDtl.data.getGroup.status;
      
      const TtlActvLonsTmsLnrChmCovs =accountDtl.data.getGroup.TtlActvLonsTmsLnrChmCov;
      const TtlActvLonsAmtLnrChmCovs =accountDtl.data.getGroup.TtlActvLonsAmtLnrChmCov;
      const grpNames =accountDtl.data.getGroup.grpName;
  
      const SenderSub =accountDtl.data.getGroup.owner;
      
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
          
          const userLoanTransferFees = CompDtls.data.getCompany.userLoanTransferFee;
          const AdvComs = CompDtls.data.getCompany.AdvCom;
          const CoverageFees = CompDtls.data.getCompany.CoverageFee;
          const AdvCompanyComs = CompDtls.data.getCompany.AdvCompanyCom;
          const AdvCovFee =(parseFloat(CoverageFees)*parseFloat(AdvComs))
          const CompCovFee = parseFloat(CoverageFees)*parseFloat(AdvCompanyComs);
          const AdvCovAmt =AdvCovFee*parseFloat(amount)
          const CompCovAmt = CompCovFee*parseFloat(amount)
          const ttlCovFeeAmount = parseFloat(CoverageFees)*parseFloat(amount)                
          
          const TotalTransacted = parseFloat(amount) + ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount);             
          const ttlCompCovEarningss = CompDtls.data.getCompany.ttlCompCovEarnings;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const AdvEarningBals = CompDtls.data.getCompany.AdvEarningBal;
          const AdvEarnings = CompDtls.data.getCompany.AdvEarning;          
          const ttlChmLnsInAmtCovs = CompDtls.data.getCompany.ttlChmLnsInAmtCov;          
          const ttlChmLnsInTymsCovs = CompDtls.data.getCompany.ttlChmLnsInTymsCov;            
          const maxInterestGrps = CompDtls.data.getCompany.maxInterestGrp;  
          const IntAmt = parseFloat(AmtExp) - (parseFloat(amount) + 
                parseFloat(userLoanTransferFees)*parseFloat(amount) + ttlCovFeeAmount)
          const Interest = (((parseFloat(AmtExp) - parseFloat(amount))*100)/(parseFloat(amount) *parseFloat(RepaymtPeriod))).toFixed(2);     
          const maxBLss = CompDtls.data.getCompany.maxBLs;
         
          const MaxSMInterest = (parseFloat(amount) +  
          (parseFloat(userLoanTransferFees)*parseFloat(amount) 
          + ttlCovFeeAmount) )*parseFloat(maxInterestGrps)*parseFloat(RepaymtPeriod);
          
          
          const ActualMaxSMInterest = parseFloat(AmtExp) - (parseFloat(amount) +  parseFloat(userLoanTransferFees)*parseFloat(amount) + 
          ttlCovFeeAmount)

          const TransCost = ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount) 
          const TtlTransCost = ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount) +  parseFloat(amount)
          const TotalAmtExp = ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount) + parseFloat(AmtExp);
          const AllTtlTrnsCst = TtlTransCost + MaxSMInterest;

   
          
          
          const fetchAdv = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{

              const AdvDtls:any = await API.graphql(
                graphqlOperation(getAdvocate,
                  {advregnu: AdvRegNo}),
                  
              );
              const advTtlAern = AdvDtls.data.getAdvocate.TtlEarnings;
              const advBl = AdvDtls.data.getAdvocate.advBal;
              const advStts = AdvDtls.data.getAdvocate.status;
              const namesssssss = AdvDtls.data.getAdvocate.name;
              

              const fetchRecUsrDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try {
                    const RecAccountDtl:any = await API.graphql(
                        graphqlOperation(getSMAccount, {awsemail: loaneeEmail}),
                        );
                        const RecUsrBal =RecAccountDtl.data.getSMAccount.balance;
                        const usrNoBL =RecAccountDtl.data.getSMAccount.MaxTymsBL;
                        const usrAcActvSttss =RecAccountDtl.data.getSMAccount.acStatus; 
                        const recAcptncCode =RecAccountDtl.data.getSMAccount.loanAcceptanceCode; 
                        const TtlActvLonsTmsLnrCovss =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLnrCov; 
                        const TtlActvLonsTmsLneeCovss =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLneeCov;
                        const TtlActvLonsTmsLneeChmCovs =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLneeChmCov;
                        const TtlActvLonsAmtLneeChmCovs =RecAccountDtl.data.getSMAccount.TtlActvLonsAmtLneeChmCov;
                        const namess =RecAccountDtl.data.getSMAccount.name;
                        const ttlDpstSMs =RecAccountDtl.data.getSMAccount.ttlDpstSM;
                        const TtlWthdrwnSMs =RecAccountDtl.data.getSMAccount.TtlWthdrwnSM;
                        const MaxAcBals =RecAccountDtl.data.getSMAccount.MaxAcBal;
                        const DefaultPenaltyRate = parseFloat(DfltPnlty)/parseFloat(AmtRepaids) *100;
                        const RecomDfltPnltyRate = (parseFloat(AmtRepaids)*20) / 100;
                      
                        const updatMmbr = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try {
                            await API.graphql(
                              graphqlOperation(updateChamaMembers, {
                                input: {
                                  ChamaNMember: ChmNMmbrPhns,
                                  LonAmtGven: (parseFloat(LonAmtGvens) + parseFloat(amount)).toFixed(0),
                                  GrossLnsGvn: (parseFloat(GrossLnsGvns) + TotalAmtExp).toFixed(0),
                                  LnBal: (parseFloat(LnBals) + TotalAmtExp).toFixed(0),                                  
                                  loanStatus:"LoanActive",                                    
                                  blStatus: "AccountNotBL",
                                
                                },
                              }),
                            );


                          } catch (error) {
                            if(!error){
                              Alert.alert("Confirm member exists")
                              
                          } 
                          else{Alert.alert("Check internet")
                          return;}
                          }
                          setIsLoading(false);
                          await sendSMLn();
                        };
                        
                        const sendSMLn = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try {
                            await API.graphql(
                              graphqlOperation(createCvrdGroupLoans, {
                                input: {
                                    grpContact: groupContacts,
                                    loaneePhn: loaneeEmail,
                                    loanerLoanee:groupContacts+memberContacts,
                                    loanerLoaneeAdv:  groupContacts+memberContacts+ AdvRegNo ,  
                                    repaymentPeriod: RepaymtPeriod,
                                    amountGiven: parseFloat(amount).toFixed(0),
                                    amountExpectedBack: TotalAmtExp.toFixed(0),
                                    amountExpectedBackWthClrnc: TotalAmtExp.toFixed(0),
                                    amountRepaid: 0,
                                    DefaultPenaltyChm:DfltPnlty,
                                    DefaultPenaltyChm2:0,
                                    description: Desc,
                                    lonBala:TotalAmtExp.toFixed(0),
                                    advRegNu: AdvRegNo,
                                    loaneeName:namess,
                                    LoanerName:grpNames,
                                    memberId:ChmNMmbrPhns,
                                    status: "LoanActive",
                                    owner: ownr,
                                },
                              }),
                            );


                          } catch (error) {
                            
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
                                    grpContact:groupContacts,
                                    TtlActvLonsTmsLnrChmCov: parseFloat(TtlActvLonsTmsLnrChmCovs)+1,
                                    TtlActvLonsAmtLnrChmCov: (parseFloat(TtlActvLonsAmtLnrChmCovs) + TotalAmtExp).toFixed(0),
                                                                              
                                    grpBal:(parseFloat(grpBals)-TtlTransCost).toFixed(0) 
                                   
                                    
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
                                    awsemail:loaneeEmail,
                                    TtlActvLonsTmsLneeChmCov: parseFloat(TtlActvLonsTmsLneeChmCovs) +1 ,
                                    TtlActvLonsAmtLneeChmCov: (parseFloat(TtlActvLonsAmtLneeChmCovs)+ TotalAmtExp).toFixed(0),
                                    balance:(parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0) ,
                                    loanStatus:"LoanActive",                                    
                                    blStatus: "AccountNotBL",
                                    loanAcceptanceCode:"None"                                
                                    
                                  }
                                })
                              )                              
                          }
                          catch(error){
                            console.log(error)
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
                          setIsLoading(false);
                          
                          try{
                              await API.graphql(
                                graphqlOperation(updateCompany, {
                                  input:{
                                    AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                        
                                    ttlCompCovEarnings:CompCovAmt + parseFloat(ttlCompCovEarningss),
                                    AdvEarningBal:AdvCovAmt + parseFloat(AdvEarningBals),                                                                                                                                                     
                                    AdvEarning:AdvCovAmt + parseFloat(AdvEarnings),
                                    companyEarningBal:CompCovAmt + parseFloat(companyEarningBals) + parseFloat(userLoanTransferFees)*parseFloat(amount),
                                    companyEarning: CompCovAmt + parseFloat(companyEarnings) + parseFloat(userLoanTransferFees)*parseFloat(amount),                                                    
                                    
                                    ttlChmLnsInAmtCov: TotalAmtExp + parseFloat(ttlChmLnsInAmtCovs),
                                   
                                    ttlChmLnsInTymsCov: 1 + parseFloat(ttlChmLnsInTymsCovs),
                                          
                                    
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error);
                            if (error){Alert.alert("Check your internet connection")
                        return;}
                          }
                          setIsLoading(false);
                          await updtAdv();
                        }
                        const updtAdv = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                              await API.graphql(
                                graphqlOperation(updateAdvocate, {
                                  input:{
                                    advregnu: AdvRegNo,
                                    advBal: AdvCovAmt + parseFloat(advBl) ,
                                    TtlEarnings:AdvCovAmt + parseFloat(advTtlAern),                                 
                                    
                                  }
                                })
                              )
                          }
                          catch(error){
                            console.log(error);
                            if (error){Alert.alert("Check your internet connection")
      return;}
                          }
                          

                          await updtLnReq();
                          setIsLoading(false);
                        }

                        const updtLnReq = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          
                          try{
                              await API.graphql(
                                graphqlOperation(updateReqLoanChama, {
                                  input:{
                                    id:route.params.id,                                                      
                                    status:"Approved"
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error);
                            if (error){Alert.alert("Check your internet connection")
                        return;}
                          }
                          Alert.alert("Transaction Fee:Ksh. "+ (parseFloat(userLoanTransferFees)*parseFloat(amount)).toFixed(2) + " coverage "+ttlCovFeeAmount.toFixed(2)
                         
                          );
                          setIsLoading(false);
                          
                        }
                                              
                        if (parseFloat(usrNoBL) > parseFloat(maxBLss)){Alert.alert('Receiver does not qualify');
                      return;
                    }
                        
                    else if(parseFloat(ttlDpstSMs) === 0 && parseFloat(TtlWthdrwnSMs)===0){Alert.alert('Loanee National ID be verified through deposit at MFNdogo');}

                    

                    else if((parseFloat(RecUsrBal) + parseFloat(amount)) > parseFloat(MaxAcBals))
                    {Alert.alert('Loanee call customer care to have wallet capacity adjusted');
                      return;
                    }

                    else if((DefaultPenaltyRate) > 20)
                    {Alert.alert('Please enter Default Penalty less than ' + RecomDfltPnltyRate);
                      return;
                    }

                    
                    else if(ownr !==SenderSub){Alert.alert('You are not the Creator of this Chama');}
                        else if(statuss !== "AccountActive"){Alert.alert('Sender account is inactive');}
                        else if(groupContacts === memberContacts){Alert.alert('You cannot Loan Yourself');}
                        else if(usrAcActvSttss !== "AccountActive"){Alert.alert('Receiver account is inactive');}
                        
                        else if (
                          parseFloat(grpBals) < TtlTransCost 
                        ) {Alert.alert('Requested amount is more than you have in your account');}
                        else if(advStts !=="AccountActive"){Alert.alert('Advocate Account is inactive');}
                        else if(signitoryPWs !==SnderPW){Alert.alert('Wrong password');}
                                                                 
            
                                                 else {
                                                  updatMmbr();
                        }                                                
                    }       
                    catch(e) {    
                      console.log(e); 
                      if (e){Alert.alert("Check your internet connection")
      return;}                 
                    }
                    setIsLoading(false);
                    }                    
                      await fetchRecUsrDtls();        
                    

            }
            catch (e){
              console.log(e);
              if (e){Alert.alert("Advocate not registered")
      return;}
            }
            setIsLoading(false);
          }
          
          await fetchAdv();

          
        
        } catch (e) {
          console.log(e);
          if (e){Alert.alert("Check your internet connection")
      return;}
        } 
        setIsLoading(false);       
      };
      await fetchCompDtls();
    
      
    } catch (e) {
      console.log(e)
      if (e){Alert.alert("Please fill details correctly or check your internet connection")
      return;}
  };
      setIsLoading(false);
      
      
}
await fetchSenderUsrDtls();

} catch (e) {
  console.log(e)
  if (e){Alert.alert("Please fill details correctly or check your internet connection")
  return;}
};
  setIsLoading(false);
  
  
}
await fetchChmMbrDtls();

} catch (e) {
  console.log(e);
  if (e){Alert.alert("Check internet or enter correct Member ID")
return;}
}
setAmount("");
      
setAdvRegNo("");
setAmtExp("");
setDesc("");
setSnderPW("");
setRepaymtPeriod("");
setRecAccCode("");
setDfltPnlty("");
setChmPhn("")
setMmbrId("")
setIsLoading(false);        
};

useEffect(() =>{
  const DfltPnltys=DfltPnlty
    if(!DfltPnltys && DfltPnltys!=="")
    {
      setDfltPnlty("");
      return;
    }
    setDfltPnlty(DfltPnltys);
    }, [DfltPnlty]
     );

     useEffect(() =>{
      const SnderNatIds=MmbrId
        if(!SnderNatIds && SnderNatIds!=="")
        {
          setMmbrId("");
          return;
        }
        setMmbrId(SnderNatIds);
        }, [MmbrId]
         );

useEffect(() =>{
  const RecPhns=RecPhn
    if(!RecPhns && RecPhns!=="")
    {
      setRecPhn("");
      return;
    }
    setRecPhn(RecPhns);
    }, [RecPhn]
     );
     
     useEffect(() =>{
  const ChmPhns=ChmPhn
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [ChmPhn]
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
              const AdvRegNoss=AdvRegNo
                if(!AdvRegNoss && AdvRegNoss!=="")
                {
                  setAdvRegNo("");
                  return;
                }
                setAdvRegNo(AdvRegNoss);
                }, [AdvRegNo]
                 );

                 useEffect(() =>{
                  const AmtExpss=AmtExp
                    if(!AmtExpss && AmtExpss!=="")
                    {
                      setAmtExp("");
                      return;
                    }
                    setAmtExp(AmtExpss);
                    }, [AmtExp]
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

                             useEffect(() =>{
                              const RepaymtPeriods=RepaymtPeriod
                                if(!RepaymtPeriods && RepaymtPeriods!=="")
                                {
                                  setRepaymtPeriod("");
                                  return;
                                }
                                setRepaymtPeriod(RepaymtPeriods);
                                }, [RepaymtPeriod]
                                 );

                                 useEffect(() =>{
                                  const RecAccCodes=RecAccCode
                                    if(!RecAccCodes && RecAccCodes!=="")
                                    {
                                      setRecAccCode("");
                                      return;
                                    }
                                    setRecAccCode(RecAccCodes);
                                    }, [RecAccCode]
                                     );

  return (
    
      <View style={styles.image}>
        <ScrollView >
         
         <View style={styles.amountTitleView}>
           <Text style={styles.title}>Fill Loan Details Below</Text>
         </View>


         <View style={styles.sendAmtView}>
           <TextInput
           placeholder='Chama PassWord'
             value={SnderPW}
             multiline={false}
             autoCompleteType ="off"
             secureTextEntry = {true}
             onChangeText={setSnderPW}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
           
         </View>


         <View style={styles.sendAmtView}>
           <TextInput
           placeholder='Default Penalty'
           keyboardType={"decimal-pad"}
             value={DfltPnlty}
             onChangeText={setDfltPnlty}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
          
         </View>

         <View style={styles.sendAmtView}>
           <TextInput
           placeholder='Advocate License Number'
             value={AdvRegNo}
             onChangeText={setAdvRegNo}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
           
         </View>



         <View style={styles.sendAmtViewDesc}>
           <TextInput
           placeholder='Loan Description'
             multiline={true}
             value={Desc}
             onChangeText={setDesc}
             style={styles.sendAmtInputDesc}
             editable={true}></TextInput>
          
         </View>

         
         

         <TouchableOpacity
           onPress={fetchChmLoanReq}
           style={styles.sendAmtButton}>
           <Text style={styles.sendAmtButtonText}>Loan with Advocate Coverage</Text>
           {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
         </TouchableOpacity>

         
       </ScrollView>
      </View>
             
    
  );
};

export default ChmCovLns;