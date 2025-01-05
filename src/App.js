import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  MediapipeCamera,
  RunningMode,
  usePoseDetection,
  KnownPoseLandmarkConnections,
  Delegate,
} from 'react-native-mediapipe';

import {useCameraPermission} from 'react-native-vision-camera';
import {PoseDrawFrame} from './Drawing';
import {useSharedValue} from 'react-native-reanimated';
import {vec} from '@shopify/react-native-skia';

const App = () => {
  const [settings, setSettings] = React.useState({
    maxResults: 5,
    threshold: 20,
    processor: Delegate.GPU,
    model: 'pose_landmarker_lite',
  });

  const camPerm = useCameraPermission();
  const [permsGranted, setPermsGranted] = React.useState({
    cam: camPerm.hasPermission,
  });
  const askForPermissions = React.useCallback(() => {
    if (camPerm.hasPermission) {
      setPermsGranted(prev => ({...prev, cam: true}));
    } else {
      camPerm.requestPermission().then(granted => {
        setPermsGranted(prev => ({...prev, cam: granted}));
      });
    }
  }, [camPerm]);

  const [active, setActive] = React.useState('back');

  const setActiveCamera = () => {
    setActive(currentCamera => (currentCamera === 'front' ? 'back' : 'front'));
  };

  const connections = useSharedValue([]);

  const onResults = React.useCallback(
    (results, vc) => {
      // console.log(
      //   JSON.stringify({
      //     inftime: results.inferenceTime,
      //     width: results.inputImageWidth,
      //     height: results.inputImageHeight,
      //     // norm: results.results[0].landmarks[0][0],
      //     // world: results.results[0].worldLandmarks[0][0],
      //   })
      // );
      // console.log(
      //   "results",
      //   JSON.stringify({
      //     p:
      //       results.results[0].landmarks[0]
      //         ?.slice(0, 10)
      //         .map((p) => ({ x: p.x.toFixed(2), y: p.y.toFixed(2) })) ?? [],
      //   })
      // );
      const frameDims = vc.getFrameDims(results);
      const pts = results.results[0].landmarks[0] ?? [];
      const newLines = [];
      if (pts.length === 0) {
        // console.log("No landmarks detected");
      } else {
        for (const connection of KnownPoseLandmarkConnections) {
          const [a, b] = connection;
          const pt1 = vc.convertPoint(frameDims, pts[a]);
          const pt2 = vc.convertPoint(frameDims, pts[b]);
          newLines.push(vec(pt1.x, pt1.y));
          newLines.push(vec(pt2.x, pt2.y));
        }
      }
      connections.value = newLines;
    },
    [connections],
  );
  const onError = React.useCallback(error => {
    console.log(`error: ${error}`);
  }, []);
  const poseDetection = usePoseDetection(
    {
      onResults: onResults,
      onError: onError,
    },
    RunningMode.LIVE_STREAM,
    `${settings.model}.task`,
    {
      fpsMode: 'none',
      // forceOutputOrientation: "portrait-upside-down",
      // forceCameraOrientation: "landscape-left",
    }, // supply a number instead to get a specific framerate
  );

  console.log(connections);

  if (permsGranted.cam) {
    return (
      <View style={styles.container}>
        <MediapipeCamera
          style={styles.box}
          solution={poseDetection}
          activeCamera={active}
          resizeMode="cover"
        />
        <PoseDrawFrame connections={connections} style={styles.box} />
        <Pressable style={styles.cameraSwitchButton} onPress={setActiveCamera}>
          <Text style={styles.cameraSwitchButtonText}>Switch Camera</Text>
        </Pressable>
      </View>
    );
  } else {
    return <NeedPermissions askForPermissions={askForPermissions} />;
  }
};

const NeedPermissions = ({askForPermissions}) => {
  return (
    <View style={styles.container}>
      <View style={styles.permissionsBox}>
        <Text style={styles.noPermsText}>
          Allow App to use your Camera and Microphone
        </Text>
        <Text style={styles.permsInfoText}>
          App needs access to your camera in order for Object Detection to work.
        </Text>
      </View>
      <Pressable style={styles.permsButton} onPress={askForPermissions}>
        <Text style={styles.permsButtonText}>Allow</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF0F0',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  box: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  permsButton: {
    padding: 15.5,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: '#F95F48',
    borderRadius: 5,
    margin: 15,
  },
  permsButtonText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  permissionsBox: {
    backgroundColor: '#F3F3F3',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCACA',
    marginBottom: 20,
  },
  noPermsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  permsInfoText: {
    fontSize: 15,
    color: 'black',
    marginTop: 12,
  },
  cameraSwitchButton: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#F95F48',
    borderRadius: 20,
    top: 20,
    right: 20,
  },
  cameraSwitchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
