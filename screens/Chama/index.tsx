import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  
  Pressable,
  
  SafeAreaView,
  ScrollView,
  
} from 'react-native';
import styles from './styles';

const MyLoanAccount = props => {
  const navigation = useNavigation();
  const[id, setID] =useState("")
  const[ChamaNMember, setChamaNMember] =useState("")


  const CreateChmss = () => {
    navigation.navigate('CreateChms');
  };

  
  const SgnIn2LnMmbrNonCovss = () => {
    navigation.navigate('ChmNonCovLons', {ChamaNMember});
  };

  const SgnIn2LnMmbrs = () => {
    navigation.navigate('ChmCovLons', {id});
  };

  const AddChmMembrssss = () => {
    navigation.navigate('AddChmMembrsss');
  };
  
  const MmbrSndChmsss = () => {
    navigation.navigate('MmbrSndChmss');
  };

  const SgnIn2RemoveMmbrss = () => {
  navigation.navigate('RemoveChmMbrs', {id});
  };

  const SgnIn2BLCovss = () => {
    navigation.navigate('SgnIn2BLCovs');
  };

  const SgnIn2BLNonCovss = () => {
    navigation.navigate('SgnIn2BLNonCovs');
  };

  const DissolveChmss = () => {
    navigation.navigate('DissolveChms');
  };

  const UpdateChmss = () => {
    navigation.navigate('UpdateChms');
  };

  const ChmSignInsss = () => {
    navigation.navigate('ChmSignInss');
  };
  const ChamSignIn2ss = () => {
    navigation.navigate('ChamSignIn2s');
  };
  const ChmLnsRecCovss = () => {
    navigation.navigate('ElimChmVwCovLnss');
  };
  const ChmLnsRecNonCovss = () => {
    navigation.navigate('ElimChmVwNonCvLns');
  };

  const ChamSignIn3ss = () => {
    navigation.navigate('ChamSignIn3s');
  };

  const ChamSignIn4ss = () => {
    navigation.navigate('ChamSignIn4s');
  };

  const ChmSignIn5ss = () => {
    navigation.navigate('ChmSignIn5s');
  };

  const ChmSignIn6ss = () => {
    navigation.navigate('ChmSignIn6s');
  };

  const ChamaSndMbrMneyss = () => {
    navigation.navigate('SndMbrsMnys', {id});
  };

  const ChmMmbrContriss = () => {
    navigation.navigate('ElimChmVwCntrMembrs');
  };

  const ChmMmbrMmbrsss = () => {
    navigation.navigate('ElimChmVwMbrshpMembrs');
  };
  const Vw2RpyCovss = () => {
    navigation.navigate('ElimRpyChmCvs');
  };

  const Vw2RpyNonCovs = () => {
    navigation.navigate('ElimRpyChmNonCvs');
  };

  const ChamaMmbrRemtss = () => {
    navigation.navigate('ElimChmVwRmtncMembrs');
  };

  const SignitoryWthdrwFndssss = () => {
    navigation.navigate('SignitoryWthdrwFndsss');
  };

  const SgnIn2VwChmDpstsss = () => {
    navigation.navigate('SgnIn2VwChmDpstss');
  };

  const SgnIn2VwChmWthdrwlsss = () => {
    navigation.navigate('SgnIn2VwChmWthdrwlss');
  };

  const Sgn2CnfrmWthdrwlssss = () => {
    navigation.navigate('Sgn2CnfrmWthdrwlsss');
  };

  const ChamaVw2GrantLnReqCov = () => {
    navigation.navigate('ChamaVw2GrantLnReqCov');
  };

  const ChamaVw2GrantLnReqNonCov = () => {
    navigation.navigate('ChamaVw2GrantLnReqNonCov');
  };


  return (
    <SafeAreaView>
      <ScrollView>
          <View style={styles.adminImage}>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Chama Loan</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Give Loan</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ChamaVw2GrantLnReqCov}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Covered Loans</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChamaVw2GrantLnReqNonCov}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Non-Covered Loans
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Black-List</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={SgnIn2BLCovss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Covered</Text>
                    </Pressable>

                    <Pressable
                      onPress={SgnIn2BLNonCovss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Non-Covered Loans
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Repay</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={Vw2RpyCovss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Covered Loans</Text>
                    </Pressable>

                    <Pressable
                      onPress={Vw2RpyNonCovs}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      Non-Covered Loans
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>View Chama Activities</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Contributions</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ChmSignIn5ss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Chama</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChmMmbrContriss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Member
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Chama Remittance</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ChamSignIn4ss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Chama</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChamaMmbrRemtss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Member
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Membership</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ChmSignIn6ss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Chama</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChmMmbrMmbrsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      Member
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Members</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Registration</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={AddChmMembrssss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Reg</Text>
                    </Pressable>

                    <Pressable
                      onPress={SgnIn2RemoveMmbrss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        De-Reg
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Money</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={MmbrSndChmsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Contribute</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChamaSndMbrMneyss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                       Send to Member
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Loan Status</Text>

                  <View style={styles.viewForClientsPressables}>

                    <View style={styles.ClientsPressablesLnStts}>

                      <View style={styles.viewForClientsCategoriesChama2}>
                      <Text style={styles.salesPressableText}>Chm</Text>
                      </View>

                    <View style={styles.viewForClientsCategoriesChama4}>
                    <Pressable
                      onPress={ChmSignInsss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>Covered</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChamSignIn2ss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>
                      NonCov
                      </Text>
                    </Pressable>
                    </View>
                    </View>

                    <View style={styles.ClientsPressablesLnStts}>

                      <View style={styles.viewForClientsCategoriesChama2}>
                      <Text style={styles.salesPressableText}>Mine</Text>
                      </View>

                    <View style={styles.viewForClientsCategoriesChama4}>
                    <Pressable
                      onPress={ChmLnsRecCovss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>Covered</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChmLnsRecNonCovss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>
                      NonCov
                      </Text>
                    </Pressable>
                    </View>
                    </View>
                    
                  </View>
                </View>


              </View>
            </View>

      
        <View style={styles.clientsView2}>
              <Text style={styles.salesText}>Chama Account</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Account</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={CreateChmss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Create</Text>
                    </Pressable>

                    <Pressable
                      onPress={DissolveChmss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Dissolve
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Account</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={UpdateChmss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Update</Text>
                    </Pressable>

                    <Pressable
                      onPress={ChamSignIn3ss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        View
                      </Text>
                    </Pressable>
                  </View>
                </View>


                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Signatory Works</Text>

                  <View style={styles.viewForClientsPressables}>

                    <View style={styles.ClientsPressablesLnStts}>

                      <View style={styles.viewForClientsCategoriesChama2}>
                      <Text style={styles.salesPressableText}>Withdrwls</Text>
                      </View>

                    <View style={styles.viewForClientsCategoriesChama4}>
                    <Pressable
                      onPress={Sgn2CnfrmWthdrwlssss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>Confirm</Text>
                    </Pressable>

                    <Pressable
                      onPress={SignitoryWthdrwFndssss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>
                      Execute
                      </Text>
                    </Pressable>
                    </View>
                    </View>

                    <View style={styles.ClientsPressablesLnStts}>

                      <View style={styles.viewForClientsCategoriesChama2}>
                      <Text style={styles.salesPressableText}>View</Text>
                      </View>

                    <View style={styles.viewForClientsCategoriesChama4}>
                    <Pressable
                      onPress={SgnIn2VwChmDpstsss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>Deposits</Text>
                    </Pressable>

                    <Pressable
                      onPress={SgnIn2VwChmWthdrwlsss}
                      style={styles.viewForClientsCategoriesChama3}>
                      <Text style={styles.clientsPressableTextStts}>
                      Wthdrwls
                      </Text>
                    </Pressable>
                    </View>
                    </View>
                    
                  </View>
                </View>

                
              </View>
            </View>
          

          
    </View> 
    </ScrollView>
    </SafeAreaView> 
    
  );
};

export default MyLoanAccount;