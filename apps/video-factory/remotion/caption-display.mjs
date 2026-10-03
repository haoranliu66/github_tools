// Display-only: keep measured cue ranges and the source transcript unchanged.
export function captionAtFrame(captions,frame) {
  const index=captions.findIndex(c=>frame>=c.startFrame&&frame<c.endFrame);
  if(index<0)return null;
  const cue=captions[index],previous=captions[index-1];
  if(previous&&previous.endFrame===cue.startFrame&&/^[”’」』》）)\]】]+$/u.test(cue.text.trim())) {
    return {...cue,text:previous.text+cue.text};
  }
  return cue;
}
