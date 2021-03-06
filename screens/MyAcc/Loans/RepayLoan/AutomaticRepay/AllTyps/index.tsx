import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList} from 'react-native';
import { listCovCreditSellers, listCvrdGroupLoans, listNonCovCreditSellers, listNonCvrdGroupLoans, listSMLoansCovereds, listSMLoansNonCovereds } from '../../../../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCvSM";
import AutoNCVSM from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoNCVSM";
import AutoChmCovLn from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoChmCovLn";
import AutoChmNonCov from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoChmNonCov";
import AutoCrdSlCv from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCrdSlCv";
import AutoCredSlNCV from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCredSlNCV";
import styles from './styles';
import { useRoute } from '@react-navigation/core';

const FetchSMCovLns = props => {

    const[LnerPhn, setLnerPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [Loaneess, setLoaneess] = useState([]);
    const [Loanees3, setLoanees3] = useState([]);
    const [Loanees4, setLoanees4] = useState([]);
    const [Loanees5, setLoanees5] = useState([]);
    const [Loanees6, setLoanees6] = useState([]);
    const combined = (Loanees[0] + Loaneess[0]);
    const route = useRoute();

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLnerPhn(userInfo.attributes.email);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listSMLoansCovereds, 
                { 
                  sortDirection: 'DESC',
                  limit: 100,             
                  filter: {
                    and: {
                      loaneePhn: { eq: LnerPhn},
                        lonBala:{gt:0},
                        
                        status:{eq:"LoanBL"}
                      
                    }
                  },
                  
                }
                  ));

                  
              setLoanees(Lonees.data.listSMLoansCovereds.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };

          useEffect(() => {
            fetchLoanees();
          }, []);


          const fetchLoanees2 = async () => {
            setLoading(true);
            try {
              const Lonees2:any = await API.graphql(graphqlOperation(listSMLoansNonCovereds, 
                { 
                  
                  sortDirection: 'DESC',
                  limit: 100,                
                  filter: {                    
                    loaneePhn: {eq:LnerPhn},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoaneess(Lonees2.data.listSMLoansNonCovereds.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees2();
          }, []);

          const fetchLoanees3 = async () => {
            setLoading(true);
            try {
              const Lonees3:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { 
                  
                  sortDirection: 'DESC',
                  limit: 100,                
                  filter: {                    
                    loaneePhn: {eq:LnerPhn},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees3(Lonees3.data.listCvrdGroupLoans.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees3();
          }, []);

          const fetchLoanees4 = async () => {
            setLoading(true);
            try {
              const Lonees4:any = await API.graphql(graphqlOperation(listNonCvrdGroupLoans, 
                { 
                  
                  sortDirection: 'DESC',
                  limit: 100,                
                  filter: {                    
                    loaneePhn: {eq:LnerPhn},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees4(Lonees4.data.listNonCvrdGroupLoans.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees4();
          }, []);

          const fetchLoanees5 = async () => {
            setLoading(true);
            try {
              const Lonees5:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                { 
                 
                  sortDirection: 'DESC',
                  limit: 100,                
                  filter: {                    
                    buyerContact: {eq:LnerPhn},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees5(Lonees5.data.listCovCreditSellers.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees5();
          }, []);

          const fetchLoanees6 = async () => {
            setLoading(true);
            try {
              const Lonees6:any = await API.graphql(graphqlOperation(listNonCovCreditSellers, 
                { 
                  
                  sortDirection: 'DESC',
                  limit: 100,                
                  filter: {                    
                    buyerContact: {eq:LnerPhn},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees6(Lonees6.data.listNonCovCreditSellers.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees6();
          }, []);

          


  return (
    <View style={styles.image}>

            <Text style={styles.label}> Please first repay these Debts</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
      <View style={styles.loanTitleView2}>
      <View style={styles.loanTitleView1}>
      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
        
      </View>

      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees3}
        renderItem={({item}) => <AutoChmCovLn ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
    
    
        
      </View>

      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees5}
        renderItem={({item}) => <AutoCrdSlCv Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
        
      </View>
      </View>

      <View style={styles.loanTitleView1}>
      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loaneess}
        renderItem={({item}) => <AutoNCVSM Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
        
      </View>

      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees4}
        renderItem={({item}) => <AutoChmNonCov ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
        
      </View>

      <View style={styles.loanTitleView}>
      <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees6}
        renderItem={({item}) => <AutoCredSlNCV Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
          </>
        )}
      />
    </View>
        
      </View>
      </View>
  
      </View>
      
    </View>
    
  );
};

export default FetchSMCovLns;