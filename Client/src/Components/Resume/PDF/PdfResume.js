import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import font from '../../../Font/FiraSans-Medium.ttf'
import fontLight from '../../../Font/FiraSans-Light.ttf'

Font.register({ family: 'Fira', src: font}, {family:'Fira-light', src: fontLight});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },

  side: {
    border: '1px solid black',
    width:'35%',
    height:'100%',
    backgroundColor: '#6A4952',
    flexDirection:'column',
    color: '#E5E5E5',
    padding:10
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
    fontSize:'11px',
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
    fontSize:'24px'
  },
  mainSubTitle: {
    fontSize:'32px',
    marginBottom:'5px'
  }

});

// Create Document Component
const PdfResume = props => {

const {resume, user} = props

console.log(user)
console.log(resume)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.side}>
          <Text style={styles.sideTitle}>PROFESSIONAL</Text>
          <Text style={styles.sideSubTitle}>PROFILE</Text>
          <View style={{marginTop:'10px', padding:'0 15px'}}>
            <Text style={styles.sideText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
          <View style={{marginTop:'10px'}}>
            <Text style={styles.sideTitle}>SKILLS</Text>
          </View>
          <View style={{marginTop:'10px', padding:'0 15px'}}>
            <Text style={styles.sideText}>* HTML/CSS</Text>
            <Text style={styles.sideText}>* Javascript</Text>
          </View>
        </View>
        <View style={styles.main}>
          <Text style={styles.mainTitle}>Raffi</Text>
          <Text style={styles.mainSubTitle}>HAYCAN</Text>
          <Text style={{fontSize:'14px'}}>React / Node.Js / Developer</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfResume