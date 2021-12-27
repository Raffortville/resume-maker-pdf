import React, { useState, useEffect } from 'react';
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Font,
	Image,
} from '@react-pdf/renderer';
import font from '../../../Font/FiraSans-Medium.ttf';
import fontLight from '../../../Font/FiraSans-Light.ttf';
import fontBold from '../../../Font/FiraSans-SemiBold.ttf';
import { firstLetterCapital } from '../../../Helpers/checkFormat';

Font.register({
	family: 'Fira',
	fonts: [
		{ src: font }, // font-style: normal, font-weight: normal
		{ src: fontLight, fontStyle: 'light' },
		{ src: fontBold, fontWeight: 'bold' },
	],
});

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#FFF',
	},
	aside: {
		width: '35%',
		height: '100%',
		flexDirection: 'column',
		color: '#E5E5E5',
		padding: 10,
	},

	sideTitle: {
		fontSize: '18px',
		padding: '4px 0px',
		fontFamily: 'Fira',
		textAlign: 'center',
		letterSpacing: '1px',
	},
	sideSubTitle: {
		fontFamily: 'Fira',
		fontSize: '14px',
		textAlign: 'center',
		letterSpacing: '1px',
	},
	sideText: {
		fontSize: '10px',
		lineHeight: '1.4px',
	},
	main: {
		padding: 10,
		border: '1px solid black',
		width: '65%',
		backgroundColor: '#FFF',
		color: '#3d3d3d',
	},
	mainTitle: {
		fontFamily: 'Fira',
		fontSize: '20px',
		color: '#5a5a5a',
	},
	mainSubTitle: {
		fontSize: '28px',
		marginBottom: '5px',
	},
	mainText: {
		fontSize: '12px',
	},
	mainTextQuestion: {
		marginTop: '5px',
		color: '#5a5a5a',
		fontFamily: 'Fira',
		letterSpacing: '1px',
		fontSize: '10px',
	},
	photoContainer: {
		height: '92px',
		width: '92px',
		position: 'absolute',
		borderRadius: '50%',
		left: '250px',
		top: '0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// Create Document Component
const PdfResume = (props) => {
	const { resume, user } = props;
	const [colorMain, setColorMain] = useState();

	console.log(resume.profilPic);

	useEffect(() => {
		switch (resume.colorMain) {
			case 'berry':
				setColorMain('#875480');
				break;

			case 'sorbet':
				setColorMain('#FAABBD');
				break;

			case 'sageGreen':
				setColorMain('#B2AC88');
				break;

			case 'maroon':
				setColorMain('#8B0000');
				break;

			case 'blue':
				setColorMain('#4682B4');
				break;

			case 'grey':
				setColorMain('#808080');
				break;
			default:
				break;
		}
	}, [resume.colorMain]);

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={[styles.aside, { backgroundColor: colorMain }]}>
					<Text style={styles.sideTitle}>PROFESSIONAL</Text>
					<Text style={[styles.sideSubTitle, { opacity: '0.7' }]}>PROFILE</Text>
					<View style={{ marginTop: '10px', padding: '0 10px' }}>
						<Text style={styles.sideText}>{resume.introduction}</Text>
					</View>
					{resume?.expertises.length > 0 && (
						<View style={{ marginTop: '15px' }}>
							<Text style={styles.sideTitle}>EXPERTISES</Text>
							<View style={{ marginTop: '10px', padding: '0 15px' }}>
								{resume.expertises.map((expert, i) => (
									<Text key={i} style={styles.sideText}>
										* {firstLetterCapital(expert)}
									</Text>
								))}
							</View>
						</View>
					)}
					{resume.softSkills.length > 0 && (
						<View style={{ marginTop: '30px' }}>
							<Text style={styles.sideTitle}>SOFT SKILLS</Text>
							<View style={{ marginTop: '10px', padding: '0 15px' }}>
								{resume.expertises.map((expert, i) => (
									<Text key={i} style={styles.sideText}>
										* {firstLetterCapital(expert)}
									</Text>
								))}
							</View>
						</View>
					)}
				</View>
				<View style={styles.main}>
					<View style={{ position: 'relative' }}>
						<Text style={styles.mainTitle}>{user.firstName}</Text>
						<Text style={styles.mainSubTitle}>{user.lastName}</Text>
						<Text style={{ fontSize: '14px' }}>{resume.position}</Text>
						<Text style={[styles.mainTextQuestion, { marginTop: '10px' }]}>
							Phone <Text style={styles.mainText}> {user.phone}</Text>
						</Text>
						<Text style={styles.mainTextQuestion}>
							Email <Text style={styles.mainText}> {user.emailPro}</Text>
						</Text>
						<Text style={styles.mainTextQuestion}>
							Place{' '}
							<Text style={styles.mainText}>
								{' '}
								{user.city}, {user.country}
							</Text>
						</Text>
						<Text style={styles.mainTextQuestion}>
							Social media{' '}
							<Text style={styles.mainText}> {resume.socialMedias}</Text>
						</Text>
						<View
							style={[styles.photoContainer, { backgroundColor: colorMain }]}>
							<Image
								style={{ width: '90px', height: '90px', borderRadius: '50%' }}
								src={resume.profilPic}
							/>
						</View>
						<View
							style={{
								width: '100%',
								borderBottom: `1px solid ${colorMain}`,
								marginTop: '30px',
							}}></View>
					</View>
					<View style={{ marginTop: '10px' }}>
						<Text style={[styles.sideSubTitle]}>
							PROFESSIONAL
							<Text style={[styles.sideSubTitle, { opacity: 0.5 }]}>
								{' '}
								EXPERIENCES
							</Text>
						</Text>
						{resume.experiences.map((exp, i) => (
							<View style={{ marginTop: '10px' }} key={i}>
								<Text
									style={[
										styles.mainTextQuestion,
										{
											backgroundColor: '#D3D3D3',
											borderRadius: '3px',
											padding: '2px 4px',
											marginTop: '10px',
										},
									]}>
									{exp.period}
								</Text>
								<Text style={[styles.mainText, { marginTop: '10px' }]}>
									<Text style={[styles.mainText, { fontSize: '16px' }]}>
										{exp.company}
									</Text>{' '}
									| {exp.place}
								</Text>
								<Text style={styles.mainText}>{exp.occupiedPosition}</Text>
								<Text style={styles.mainText}>{exp.project}</Text>
								<Text style={styles.mainText}>{exp.descritpion}</Text>
								<Text style={styles.mainText}>{exp.achievements}</Text>
								<Text style={styles.mainText}>{exp.stack}</Text>
							</View>
						))}
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default PdfResume;
