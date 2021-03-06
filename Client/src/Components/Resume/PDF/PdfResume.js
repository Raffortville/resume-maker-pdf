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
		fontSize: '16px',
		padding: '4px 0px',
		fontFamily: 'Fira',
		textAlign: 'center',
		letterSpacing: '1px',
	},
	sideSubTitle: {
		fontFamily: 'Fira',
		fontStyle: 'light',
		fontSize: '14px',
		textAlign: 'center',
		letterSpacing: '1px',
	},
	sideText: {
		fontFamily: 'Fira',
		fontSize: '10px',
		lineHeight: '1.4px',
	},
	sideTextBold: {
		fontFamily: 'Fira',
		fontSize: '11px',
		lineHeight: '1.4px',
		fontWeight: 'bold',
	},
	mainText: {
		fontSize: '10px',
	},
	mainTextBold: {
		fontFamily: 'Fira',
		fontSize: '10px',
		lineHeight: '1.4px',
		fontWeight: 'bold',
	},
	mainTextLight: {
		fontFamily: 'Fira',
		fontSize: '10px',
		lineHeight: '1.4px',
		fontStyle: 'light',
	},
	main: {
		padding: 10,
		border: '1px solid black',
		width: '65%',
		backgroundColor: '#FFF',
		color: '#3d3d3d',
	},
	mainTitle: {
		fontSize: '18px',
		color: '#5a5a5a',
	},
	mainSubTitle: {
		fontSize: '28px',
		marginBottom: '5px',
	},
	mainTextQuestion: {
		marginTop: '5px',
		color: '#5a5a5a',
		fontFamily: 'Fira',
		letterSpacing: '1px',
		fontSize: '10px',
		fontStyle: 'light',
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

	const asideElemenent = (
		<View style={[styles.aside, { backgroundColor: colorMain }]}>
			<Text style={styles.sideTitle}>PROFIL</Text>
			<Text style={[styles.sideSubTitle, { opacity: '0.7' }]}>
				PROFESSIONEL
			</Text>
			<View style={{ marginTop: '10px', padding: '0 10px' }}>
				<Text style={styles.sideText}>{resume.introduction}</Text>
			</View>
			{resume?.expertises.length > 0 && (
				<View style={{ marginTop: '10px' }}>
					<Text style={styles.sideTitle}>COMPETENCES</Text>
					<View style={{ padding: '0 15px' }}>
						{resume.expertises.map((expert, i) => (
							<>
								<Text
									key={i}
									style={[
										styles.sideTextBold,
										{
											textTransform: 'uppercase',
											marginTop: '5px',
											letterSpacing: '1px',
										},
									]}>
									{expert.expertiseKey} :
								</Text>
								{expert.skills.map((skill, idx) => (
									<Text
										key={idx}
										style={[
											styles.mainTextLight,
											{ fontSize: '11px', letterSpacing: '1px' },
										]}>
										* {skill.value}
									</Text>
								))}
							</>
						))}
					</View>
				</View>
			)}
			{resume?.softSkills.length > 0 && (
				<View>
					<Text style={styles.sideTitle}>SOFT SKILLS</Text>
					<View style={{ marginTop: '5px', padding: '0 15px' }}>
						{resume.softSkills.map((soft, i) => (
							<Text key={i} style={styles.sideTextBold}>
								* {soft.value}
							</Text>
						))}
					</View>
				</View>
			)}
		</View>
	);

	const headElement = (
		<View style={{ position: 'relative' }}>
			<Text style={styles.mainTitle}>{user.firstName}</Text>
			<Text style={styles.mainSubTitle}>{user.lastName}</Text>
			<Text style={{ fontSize: '16px', letterSpacing: '1px' }}>
				{resume.position}
			</Text>
			<Text style={[styles.mainTextQuestion, { marginTop: '10px' }]}>
				Mobile
				<Text style={styles.mainText}> {user.phone}</Text>
			</Text>
			<Text style={styles.mainTextQuestion}>
				Email <Text style={styles.mainText}> {user.emailPro}</Text>
			</Text>
			<Text style={styles.mainTextQuestion}>
				Lieu{' '}
				<Text style={styles.mainText}>
					{' '}
					{user.city}, {user.country}
				</Text>
			</Text>
			<Text style={styles.mainTextQuestion}>
				Media social <Text style={styles.mainText}> {resume.socialMedias}</Text>
			</Text>
			<View style={[styles.photoContainer, { backgroundColor: colorMain }]}>
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
	);

	const mainElement = (
		<View style={{ marginTop: '10px' }}>
			<Text style={[styles.sideSubTitle]}>
				EXPERIENCES
				<Text style={[styles.sideSubTitle, { opacity: 0.5 }]}>
					{' '}
					PROFESSIONNELLES
				</Text>
			</Text>
			{resume.experiences.map((exp, i) => (
				<View key={i}>
					<Text
						style={[
							styles.mainTextBold,
							{
								backgroundColor: '#D3D3D3',
								borderRadius: '3px',
								padding: '2px 4px',
								marginTop: '10px',
							},
						]}>
						{exp.period} | {exp.company} | {exp.place}
					</Text>
					<Text style={[{ marginTop: '10px', fontSize: '12px' }]}>
						{exp.occupiedPosition}
					</Text>
					<Text style={[styles.mainTextLight, { marginTop: '5px' }]}>
						{exp.descritpion}
					</Text>
					<Text style={[styles.mainTextLight, { marginTop: '5px' }]}>
						{exp.project}
					</Text>
					<Text style={[styles.mainText, { marginTop: '10px' }]}>
						{exp.stack.map((stk, i) => (
							<Text key={i} style={i > 0 && { marginLeft: '3px' }}>
								{firstLetterCapital(stk.value)} |{' '}
							</Text>
						))}
					</Text>
					<Text
						style={[
							styles.mainTextQuestion,
							{
								backgroundColor: '#e7e7e7',
								borderRadius: '3px',
								padding: '2px 4px',
								margin: '10px 0',
							},
						]}>
						Projets r??alis??s {exp.company}
					</Text>
					{exp.achievements.map((ach, i) => (
						<View key={i}>
							<Text style={[styles.mainTextLight]}>* {ach.value}</Text>
						</View>
					))}
				</View>
			))}
		</View>
	);

	const bottomElement = (
		<>
			<View
				style={{
					width: '100%',
					borderBottom: `1px solid ${colorMain}`,
					marginTop: '30px',
				}}></View>
			<Text style={[styles.sideSubTitle, { marginTop: '10px' }]}>
				EDUCATION
				<Text style={[styles.sideSubTitle, { opacity: 0.5 }]}> </Text>
			</Text>
			<View>
				<Text
					style={[
						styles.mainTextBold,
						{
							backgroundColor: '#D3D3D3',
							borderRadius: '3px',
							padding: '2px 4px',
							marginTop: '10px',
						},
					]}>
					{resume?.education?.period} | {resume?.education?.academy} |{' '}
				</Text>
				<Text style={[{ marginTop: '10px', fontSize: '12px' }]}>
					{resume?.education?.certificate}
				</Text>
			</View>
		</>
	);

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{asideElemenent}
				<View style={styles.main}>
					{headElement}
					{mainElement}
					{bottomElement}
				</View>
			</Page>
		</Document>
	);
};

export default PdfResume;
