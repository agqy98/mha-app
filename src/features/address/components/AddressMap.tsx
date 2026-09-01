import {
  Box,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon
  from "@mui/icons-material/LocationOnOutlined";

interface AddressMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default function AddressMap({
  latitude,
  longitude,
  address,
}: AddressMapProps) {
  const apiKey =
    import.meta.env.VITE_GEOAPIFY_API_KEY;

  const params = new URLSearchParams({
    style: "osm-bright",
    width: "800",
    height: "300",

    center:
      `lonlat:${longitude},${latitude}`,

    zoom: "16",

    marker:
      `lonlat:${longitude},${latitude};` +
      "type:material;" +
      "color:#e53935;" +
      "size:48",

    apiKey,
  });

  const mapUrl =
    `https://maps.geoapify.com/v1/staticmap?${params.toString()}`;

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1 }}
      >
        Delivery Location
      </Typography>

      <Box
        component="img"
        src={mapUrl}
        alt={`Map showing ${address}`}
        sx={{
          display: "block",
          width: "100%",
          height: {
            xs: 200,
            sm: 250,
          },
          objectFit: "cover",

          borderRadius: 2,

          border: 1,
          borderColor: "divider",
        }}
      />

      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "flex-start",
          gap: 0.75,
        }}
      >
        <LocationOnOutlinedIcon
          fontSize="small"
          color="primary"
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {address}
        </Typography>
      </Box>
    </Box>
  );
}