# FFMPEG Recipes

A list of useful recipes that I've come across and used

## Simple usage

Convert audio and video by just changing the extension, `ffmpeg` figures out the decoder / encoder

`-i`: input

```
ffmpeg -i input.aac output.flac
```

## Extract audio

`-vn`: no video
`-acodec copy`: get audio

```
ffmpeg -i input.mkv  -vn -acodec copy output.flac
```

## Convert video to h.264

```
ffmpeg -i input.mov -c:v libx264 output.mp4
```

### Lossless to Lossy
Add `-crf [number]` to use loss profiles. Lower is higher quality and larger file size

Values:
- `0`: lossless
- `23`: default
- `51`: worst
- `17 – 28`: good range

```
ffmpeg -i input.mov -c:v libx264 -crf 28 output.mp4
```

### Reduce video size (width and height)

Using video filters:

```
ffmpeg -i input.mp4 -vf "scale=iw/2:ih/2" output.mp4
```

### Speed-up video by 2x

Using video filters:

```
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
```
