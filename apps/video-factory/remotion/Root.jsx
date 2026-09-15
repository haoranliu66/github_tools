import React from 'react';
import {Composition} from 'remotion';
import {KnowledgeVideo} from './KnowledgeVideo';

const fallback = {
  meta: {
    title: 'GitHub 开源项目速览',
    repo: 'owner/repository',
    accent: '#7c5cff',
    width: 1280,
    height: 720,
    fps: 30,
  },
  scenes: [
    {type: 'title', duration: 3, title: 'GitHub 开源项目速览', subtitle: '从趋势到技术原理'},
  ],
};

export const RemotionRoot = () => (
  <Composition
    id="KnowledgeShare"
    component={KnowledgeVideo}
    defaultProps={fallback}
    durationInFrames={90}
    fps={30}
    width={1280}
    height={720}
    calculateMetadata={({props}) => ({
      durationInFrames: props.scenes.reduce(
        (total, scene) => total + Math.max(1, Math.round(scene.duration * props.meta.fps)),
        0,
      ),
      fps: props.meta.fps,
      width: props.meta.width,
      height: props.meta.height,
    })}
  />
);

