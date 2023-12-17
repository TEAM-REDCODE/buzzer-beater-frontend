import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Modal, View, Alert } from 'react-native';

const NicknamePopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nickname Popup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PasswordPopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>PasswordPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PhysicalPopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>PhysicalPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const MecenearyPopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>MecenearyPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PositonPopup = ({ modalVisible, setModalVisible }) => {
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>PositonPopup load!!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export {NicknamePopup, PasswordPopup, PhysicalPopup, MecenearyPopup, PositonPopup}