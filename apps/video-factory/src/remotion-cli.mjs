#!/usr/bin/env node
import {findInstalledRemotionSkills, loadRemotionGuidance, syncRemotionSkills} from './remotion-integration.mjs';

try {
  const command = process.argv[2] ?? 'check';
  if (command === 'sync') {
    const skillsRoot = findInstalledRemotionSkills();
    const manifest = syncRemotionSkills({skillsRoot});
    console.log(JSON.stringify({status: 'synced', skillsRoot, ...manifest}, null, 2));
  } else if (command === 'check') {
    const {metadata} = loadRemotionGuidance();
    let installedSkillsRoot = null;
    try { installedSkillsRoot = findInstalledRemotionSkills(); } catch {}
    console.log(JSON.stringify({status: 'ready', installedSkillsRoot, ...metadata}, null, 2));
  } else throw new Error('Usage: remotion-cli.mjs <sync|check>');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
