import json
import struct

def has_audio_track(filename):
    with open(filename, 'rb') as f:
        data = f.read(4096)
        # Check for 'mp4a' or 'enca' or any audio atom inside the first few bytes might be tough
        pass
