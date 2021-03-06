import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

const KFAdvHome = props => {
  const navigation = useNavigation();

 
  const MFAdvocateRegs = () => {
    navigation.navigate('MFAdvocateReg');
  };

  const WithdwAdvss = () => {
    navigation.navigate('WithdwAdvs');
  };

  
    const UpdtMFAdvPWss = () => {
      navigation.navigate('UpdtMFAdvPWs');
  
  };

  const EntrAdvLoc = () => {
    navigation.navigate('EntrAdvLoc');

};



  const AdvVwCrdSlsSgnInss = () => {
    navigation.navigate('AdvVwCrdSlsSgnIns');
  };
  const AdvVwSMSgnInss = () => {
    navigation.navigate('AdvVwSMSgnIns');
  };
  const AdvWthdrwlSgnInss = () => {
    navigation.navigate('AdvWthdrwlSgnIns');
  };
  const AdvVwAcSgnInss = () => {
    navigation.navigate('AdvVwAcSgnIns');
  };
  const AdvVwChmSgnInss = () => {
    navigation.navigate('AdvVwChmSgnIns');
  };

  return (
    
      <SafeAreaView
        
        style={styles.floatimage}>
        
        <View style={styles.floatMainView}>
          <Text style={styles.floatText}> View</Text>

          <View style={styles.viewForFloatPressables}>
            <Pressable
              onPress={AdvVwCrdSlsSgnInss}
              style={styles.floatView}>
              <Text style={styles.floatPressableText2}>CredSls</Text>
            </Pressable>

            <Pressable onPress={AdvVwSMSgnInss} style={styles.floatView}>
              <Text style={styles.floatPressableText2}>SMLoans</Text>
            </Pressable>

            <Pressable
              onPress={AdvWthdrwlSgnInss}
              style={styles.floatView}>
              <Text style={styles.floatPressableText2}>My Withdrwls</Text>
            </Pressable>

            

            <Pressable
              onPress={AdvVwChmSgnInss}
              style={styles.floatView}>
              <Text style={styles.floatPressableText2}>Chama Loans</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.floatMainView}>
          <Text style={styles.floatText}>My Account</Text>

          <View style={styles.viewForFloatPressables}>
            <Pressable
              onPress={UpdtMFAdvPWss}
              style={styles.floatView}>
              <Text style={styles.floatPressableText}>UpdateAc</Text>
            </Pressable>

            <Pressable
              onPress={AdvVwAcSgnInss}
              style={styles.floatView}>
              <Text style={styles.floatPressableText}>ViewAc</Text>
            </Pressable>
            <Pressable
              onPress={MFAdvocateRegs}
              style={styles.floatView}>
              <Text style={styles.floatPressableText}>CreateAc</Text>
            </Pressable>

            <Pressable
              onPress={EntrAdvLoc}
              style={styles.floatView}>
              <Text style={styles.floatPressableText}>SearchAdvocate</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.floatMainView}>
          <Text style={styles.floatText}> Earnings</Text>

          <View style={styles.viewForFloatPressables}>
            
            <Pressable onPress={WithdwAdvss} style={styles.floatView}>
              <Text style={styles.floatPressableText}>Withdraw</Text>
            </Pressable>

            
          </View>
        </View>
      </SafeAreaView>
    
  );
};

export default KFAdvHome;