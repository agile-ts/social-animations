import {Config} from 'remotion';

Config.Rendering.setImageFormat('jpeg');
Config.Rendering.setConcurrency(1); // TODO fix multi core rendering in 'CodeFrame'.. as a workaround only render with one core for now
