package com.redact.facedetectorframeprocessorplugin;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import java.util.Map;

public class FaceDetectorFrameProcessorPluginPlugin extends FrameProcessorPlugin {
  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    // code goes here
    return null;
  }
}