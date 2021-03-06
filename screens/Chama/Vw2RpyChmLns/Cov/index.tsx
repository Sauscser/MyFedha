import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Chama/RepayChmLn/RepyChmCovLn";
import styles from './styles';
import { listCvrdGroupLoans } from '../../../../src/graphql/queries';

const FetchSMCovLns = props => {

    const[LneeEmail, setLneeEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneeEmail(userInfo.attributes.email);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { filter: {
                    and: {
                      loaneePhn: { eq: LneeEmail},
                      lonBala:{gt:0}
                      
                    }
                  }}
                  ));
              setLoanees(Lonees.data.listCvrdGroupLoans.items);
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
        renderItem={({item}) => <LnerStts ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Chama Covered Loans</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;