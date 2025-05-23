import {
  Divider,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import { usePreferences } from '@context'
import { Link } from '@components/link'
import ieLogo from '@images/ie-logo.png'
import renciLogo from '@images/renci-logo.png'
import renciLogoDark from '@images/renci-logo-dark.png'
import silsLogo from '@images/sils-logo.png'

const version = process.env.TAG ?? 'local'

const AppVersion = () => (
  <Stack
    direction="row"
    sx={{
      position: 'absolute',
      bottom: '0.5rem',
      right: '0.5rem',
      fontSize: '75%',
      zIndex: 999,
      whiteSpace: 'no'
    }}
  >
    <Typography color="default" level="body-xs" >
      <Typography>Version:{' '}</Typography>
      <Typography variant="soft" color="primary">{ version }</Typography>
    </Typography>
  </Stack>
)

export const Footer = () => {
  const { colorMode } = usePreferences()

  return (
    <Sheet
      variant="soft"
      component="footer"
      gap={ 2 }
      sx={{
        position: 'relative',
        p: 2,
        borderTop: '1px solid var(--joy-palette-divider)',
        '.logo-list': {
          maxWidth: '800px',
          mx: 'auto',
          pb: 2,
        },
        '.copyright': {
          maxWidth: '800px',
          mx: 'auto',
        },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={ 1 }
        className="logo-list"
        justifyContent={{ xs: 'center', sm: 'space-around' }}
        alignItems={{ xs: 'center', sm: 'flex-end' }}
      >
        <Link to="https://ie.unc.edu/"><img
          src={ ieLogo }
          height="28px"
        /></Link>
        <Link to="https://renci.org/"><img
          src={ (!colorMode || colorMode.light) ? renciLogo : renciLogoDark }
          height="35px"
        /></Link>
        <Link to="https://sils.unc.edu/"><img
          src={ silsLogo }
          height="28px"
        /></Link>
      </Stack>

      <Divider />

      <Stack
        justifyContent="center"
        alignItems="center"
        className="copyright"
        gap={ 2 }
        p={ 2 } pb={ 0 }
      >
        <Typography level="body-sm" textAlign="center">
          OPAL was developed under funding from the U.S. EPA
          under Contract 68HERD21A0002 Task Order 68HERH23F0157 to the University of North Carolina at Chapel Hill
          {' '}<Link to="https://ie.unc.edu/">UNC Institute for the Environment (UNC-IE)</Link>,
          {' '}<Link to="https://renci.org">Renaissance Computing Insititute (RENCI)</Link> and
          {' '}<Link to="https://sils.unc.edu/">School of Information and Library Sciences (SILS)</Link>.
        </Typography>
        <Typography level="body-xs" textAlign="center">
          &copy; { new Date().getFullYear() }
        </Typography>
      </Stack>
      <AppVersion />
    </Sheet>
  )
}
