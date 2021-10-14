import React from 'react'

export default function RenderResult({ diagnosis }) {

    console.log('diagnosis: ', diagnosis);
    return (
        <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: theme.primaryColor }]}>{diagnosis}</Text>
            <Icon name={indication ? 'emoji-happy' : 'emoji-sad'} style={[styles.inidicationIcon, { color: THEME.gold }]} />
        </View>
    )
}