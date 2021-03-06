import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList} from 'react-native';
import { listNonCovCreditSellers } from '../../../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/VwCredSales/2RepayNonCov";
import styles from './styles';

const FetchSMCovLns = props => {

    const[LnerPhn, setLnerPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

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
              const Lonees:any = await API.graphql(graphqlOperation(listNonCovCreditSellers, 
                { filter: {
                    and: {
                      buyerContact: { eq: LnerPhn},
                      lonBala:{gt:0}
                      
                    }
                  }}
                  ));
              setLoanees(Lonees.data.listNonCovCreditSellers.items);
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
        data={Loanees}
        renderItem={({item}) => <LnerStts Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Loaners</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;