import { styled, Theme } from '@mui/material/styles';
import { JSX, useCallback, useState, ChangeEvent, ReactNode, KeyboardEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { VideoDetails } from 'yt-dlp-wrapper';
import EventChannel from '../shared/EventChannel';

interface Download {
  title: string;
  uploader: string;
  thumbnail: string;
}

const TEMP_DOWNLOADS: Download[] = [
  {
    title: 'Are These Jokes Too Far?wegjnweoignweoignwe oignewoign weognewognw eoi  g nweogin  w egoi wneg oinwegi  owen goiw negoi   wengoiw engoiweng',
    uploader: 'JJ Olatunji',
    thumbnail: 'https://i.ytimg.com/vi/6NVCkSZf91c/maxresdefault.jpg',
  }
];

const Downloads = (): JSX.Element => {
  const [url, setUrl] = useState<string>('');
  const [downloads, setDownloads] = useState<Download[]>([]);

  const handleUrlChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  }, []);

  const loadMetadata = useCallback((): void => {
    if (!url) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electron.send(EventChannel.GetMetadata, { url });
  }, [url]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electron.on(EventChannel.GetMetadata, (args: { metadata: VideoDetails[] }): void => {
      const orderedMetadata = args.metadata.sort((a: VideoDetails, b: VideoDetails): number => {
        if (!a.playlist_index || !b.playlist_index) {
          return 0;
        }

        return a.playlist_index - b.playlist_index;
      });

      console.log(orderedMetadata);

      setDownloads(orderedMetadata.map((metadata: VideoDetails): Download => ({
        title: metadata.title,
        uploader: metadata.uploader,
        thumbnail: metadata.thumbnail,
      })));
    });

    return (): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.electron.removeAllListeners(EventChannel.GetMetadata);
    };
  }, []);

  const CustomLinearProgress = styled(LinearProgress)(({ theme: Theme }) => ({
    height: 10,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        flexDirection: 'column',
        display: 'flex',
        padding: '1.2rem',
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <Toolbar />
      <TextField
        id="url"
        label="URL"
        variant="filled"
        fullWidth
        value={url}
        onChange={handleUrlChange}
        onKeyUp={(event: KeyboardEvent<HTMLInputElement>): void => {
          if (event.key === 'Enter') {
            loadMetadata();
          }
        }}
      />

      <List sx={{ width: '100%', pt: 3 }}>
        {
          (downloads.length > 0 ? downloads : TEMP_DOWNLOADS).map((download: Download, key: number): ReactNode => (
            <>
              <ListItem key={`downloads_${key}`} alignItems="flex-start" sx={{ pl: 1, pr: 1, pb: 2, pt: 2 }}>
                <img
                  src={download.thumbnail}
                  alt={download.title}
                  style={{ height: '80px', marginRight: '1.2rem', flexGrow: 0, flexBasis: '142px' }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0, mb: 1 }}>
                    <ListItemText
                      primary={download.title}
                      primaryTypographyProps={{ noWrap: true, maxWidth: '100%', textOverflow: 'ellipsis' }}
                      secondary={download.uploader}
                      secondaryTypographyProps={{ noWrap: true, maxWidth: '100%', textOverflow: 'ellipsis' }}
                      sx={{ mt: 0, mb: 0, overflow: 'hidden' }}
                    />
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        50% @ 90.21 MB/s
                      </Typography>
                      {/*<Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        (1 / 50 files downloaded)
                      </Typography>*/}
                    </Box>

                    <LinearProgress variant="determinate" value={50} sx={{ mb: 1 }} />
                    {/*<CustomLinearProgress variant="determinate" value={50} />*/}
                  </Box>
                </Box>
              </ListItem>

              {
                key !== (downloads.length > 0 ? downloads : TEMP_DOWNLOADS).length - 1 && (<Divider />)
              }
            </>
          ))
        }
      </List>
    </Box>
  );
};

export default Downloads;
