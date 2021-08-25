import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import font from '../../../Font/FiraSans-Medium.ttf'
import fontLight from '../../../Font/FiraSans-Light.ttf'

Font.register({ family: 'Fira', src: font}, {family:'Fira-light', src: fontLight});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },

  sideGreen: {
    width:'35%',
    height:'100%',
    flexDirection:'column',
    color: '#E5E5E5',
    padding:10,
    backgroundColor:'green'
  },
  sideBerry: {
    width:'35%',
    height:'100%',
    flexDirection:'column',
    color: '#E5E5E5',
    padding:10,
    backgroundColor:'#8d4e85'
  },
  sideTitle: {
    fontSize:'18px',
    padding:'4px 0px',
    fontFamily:'Fira',
    textAlign:'center'
  },
  sideSubTitle: {
    fontFamily:'Fira',
    fontSize:'14px',
    textAlign:'center'
  },
  sideText: {
    fontSize:'10px',
    lineHeight:'1.4px'
  },
  main: {
    padding:10,
    border: '1px solid black',
    width:'65%',
    height:'100%',
    backgroundColor: '#FFF',
    color:'#3d3d3d'
  },
  mainTitle: {
    color:'#6A4952',
    fontFamily:'Fira',
    fontSize:'20px'
  },
  mainSubTitle: {
    fontSize:'28px',
    marginBottom:'5px'
  },
  photoContainer: {
    border: '1px solid black',
    height: '80px',
    width:'80px',
    borderBottomLeftRadius:'50%',
    borderBottomRightRadius:'50%',
    borderTopLeftRadius:'50%',
    borderTopRightRadius:'50%',
    position: 'abosolute',
    left:'250px',
    bottom:'60px'
  }

});

// Create Document Component
const PdfResume = props => {

  const {resume, user } = props  

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={resume.colorMain === 'berry' ? styles.sideBerry : styles.sideGreen}>
          <Text style={styles.sideTitle}>PROFESSIONAL</Text>
          <Text style={styles.sideSubTitle}>PROFILE</Text>
          <View style={{marginTop:'10px', padding:'0 10px'}}>
            <Text style={styles.sideText}>
              {resume.introduction}
            </Text>
          </View>
          <View style={{marginTop:'10px'}}>
            <Text style={styles.sideTitle}>SKILLS</Text>
          </View>
          <View style={{marginTop:'10px', padding:'0 15px'}}>
            <Text style={styles.sideText}>* HTML/CSS</Text>
            <Text style={styles.sideText}>* {resume.profilPic}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={{position:'relative'}}>
            <Text style={styles.mainTitle}>{user.firstName}</Text>
            <Text style={styles.mainSubTitle}>{user.lastName}</Text>  
            <Text style={{fontSize:'14px'}}>{resume.position}</Text>
            <Image style={styles.photoContainer} source={resume.profilPic}/>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfResume