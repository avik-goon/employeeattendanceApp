import React from 'react';
import { Alert, Text, VStack, HStack } from 'native-base';
const AlertDialog = ({ status, variant, msg, colorScheme = "emerald" }) => {
    return (
        <Alert
            w="100%"
            variant={variant}
            status={status}
            colorScheme="emerald"
        >
            <VStack space={2} flexShrink={1} w="100%">
                <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text _dark={{ color: 'emerald.200' }} _light={{ color: 'secondary.700' }} >
                            {msg}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
}
export default AlertDialog;