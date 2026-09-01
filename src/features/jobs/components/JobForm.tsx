import {
  useState,
  type FormEvent,
} from "react";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon
  from "@mui/icons-material/LocationOnOutlined";

import type { Address } from "../../../types/Address";
import type { SenderCompany } from "../../../types/SenderCompany";

import type { NewJobInput } from "../types";

import {
  PARCEL_SIZES,
  PARCEL_TYPES,
} from "../constants/jobOptions";

import {
  searchSingaporeAddresses,
  type AddressSuggestion,
} from "../../address/services/addressService";

import AddressMap from "../../address/components/AddressMap";

interface JobFormProps {
  senderCompanies: SenderCompany[];

  initialValues?: NewJobInput;

  onSubmit: (job: NewJobInput) => void;
  onCancel: () => void;

  submitLabel?: string;
}

type FormErrors = Partial<
  Record<
    | "buyerName"
    | "buyerAddress"
    | "postalCode"
    | "contactNumber"
    | "senderCompanyId"
    | "deliveryDate",
    string
  >
>;

const emptyForm: NewJobInput = {
  buyerName: "",

  buyerAddress: {
    address: "",
    unit: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
  },

  contactNumber: "",

  senderCompanyId: "",

  parcelType: "Box",
  parcelSize: "Small",

  deliveryDate: "",

  notes: "",
};

const emptyAddress: Address = {
  address: "",
  unit: "",
  postalCode: "",
  latitude: 0,
  longitude: 0,
};

function createAddressSuggestion(
  values?: NewJobInput
): AddressSuggestion | null {
  if (!values?.buyerAddress.address) {
    return null;
  }

  const {
    address,
    postalCode,
    latitude,
    longitude,
  } = values.buyerAddress;

  const formatted = [
    address,
    postalCode
      ? `Singapore ${postalCode}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: `${latitude}-${longitude}`,

    formatted,

    addressLine1: address,

    postalCode,

    latitude,
    longitude,
  };
}

export default function JobForm({
  senderCompanies,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save Job",
}: JobFormProps) {

  /* -------------------------------------------------------
     JOB FORM STATE
  ------------------------------------------------------- */

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<NewJobInput>(
    initialValues ?? emptyForm
  );

  const initialAddress =
    createAddressSuggestion(initialValues);

  const [errors, setErrors] =
    useState<FormErrors>({});

  /* -------------------------------------------------------
     ADDRESS SEARCH STATE
  ------------------------------------------------------- */

  const [
    addressInput,
    setAddressInput,
  ] = useState(
    initialAddress?.formatted ?? ""
  );

  const [
    addressOptions,
    setAddressOptions,
  ] = useState<AddressSuggestion[]>([]);


  const [
    selectedAddress,
    setSelectedAddress,
  ] =
    useState<AddressSuggestion | null>(
      initialAddress
    );

  const [
    addressLoading,
    setAddressLoading,
  ] = useState(false);


  const [
    addressDropdownOpen,
    setAddressDropdownOpen,
  ] = useState(false);


  const [
    addressApiError,
    setAddressApiError,
  ] = useState<string | null>(null);


  /* -------------------------------------------------------
     GEOAPIFY SEARCH
  ------------------------------------------------------- */

  const handleAddressSearch =
    async () => {

      const query =
        addressInput.trim();

      if (query.length < 3) {
        setAddressApiError(
          "Enter at least 3 characters"
        );

        return;
      }


      try {
        setAddressLoading(true);

        setAddressApiError(null);


        const results =
          await searchSingaporeAddresses(
            query
          );


        setAddressOptions(results);

        // Open dropdown after API results return.
        setAddressDropdownOpen(true);


        if (results.length === 0) {
          setAddressApiError(
            "No Singapore addresses found"
          );
        }

      } catch (error) {

        console.error(error);

        setAddressOptions([]);

        setAddressApiError(
          "Unable to search addresses. Please try again."
        );

      } finally {

        setAddressLoading(false);

      }
    };


  /* -------------------------------------------------------
     SELECT ADDRESS
  ------------------------------------------------------- */

  const handleAddressSelected = (
    address:
      AddressSuggestion | null
  ) => {

    setSelectedAddress(address);


    if (!address) {

      setForm((current) => ({
        ...current,

        buyerAddress: {
          ...emptyAddress,

          // keep unit if user already entered it
          unit:
            current.buyerAddress.unit,
        },
      }));

      return;
    }


    setAddressInput(
      address.formatted
    );


    setAddressDropdownOpen(false);


    setForm((current) => ({
      ...current,

      buyerAddress: {
        ...current.buyerAddress,

        address:
          address.addressLine1,

        postalCode:
          address.postalCode,

        latitude:
          address.latitude,

        longitude:
          address.longitude,
      },
    }));


    // Remove existing validation errors.
    setErrors((current) => ({
      ...current,

      buyerAddress: undefined,
      postalCode: undefined,
    }));


    setAddressApiError(null);
  };


  /* -------------------------------------------------------
     VALIDATION
  ------------------------------------------------------- */

  const validate = () => {

    const nextErrors: FormErrors =
      {};


    if (!form.buyerName.trim()) {

      nextErrors.buyerName =
        "Buyer name cannot be blank";
    }


    /*
     * Don't just check whether something
     * was typed.
     *
     * Require the user to select a valid
     * Geoapify result.
     */
    if (!selectedAddress) {

      nextErrors.buyerAddress =
        "Please search and select a valid address";
    }


    if (
      !/^\d{6}$/.test(
        form.buyerAddress.postalCode
      )
    ) {

      nextErrors.postalCode =
        "Enter a valid 6-digit postal code";
    }


    const normalizedPhone =
      form.contactNumber.replace(
        /\D/g,
        ""
      );


    const localNumber =
      normalizedPhone.startsWith("65")
        ? normalizedPhone.slice(2)
        : normalizedPhone;


    if (
      !/^[689]\d{7}$/.test(
        localNumber
      )
    ) {

      nextErrors.contactNumber =
        "Enter a valid Singapore contact number";
    }


    if (!form.senderCompanyId) {

      nextErrors.senderCompanyId =
        "Please select a sender company";
    }


    if (!form.deliveryDate) {

      nextErrors.deliveryDate =
        "Please select a delivery date";
    }


    setErrors(nextErrors);


    return (
      Object.keys(nextErrors).length === 0
    );
  };


  /* -------------------------------------------------------
     SUBMIT
  ------------------------------------------------------- */

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    if (!validate()) {
      return;
    }


    onSubmit(form);
  };


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },

          gap: 2,
        }}
      >

        {/* BUYER NAME */}

        <TextField
          label="Buyer Name"

          value={form.buyerName}

          error={Boolean(
            errors.buyerName
          )}

          helperText={
            errors.buyerName
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              buyerName:
                event.target.value,
            }))
          }
        />


        {/* SENDER COMPANY */}

        <TextField
          select

          label="Sender Company"

          value={
            form.senderCompanyId
          }

          error={Boolean(
            errors.senderCompanyId
          )}

          helperText={
            errors.senderCompanyId
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              senderCompanyId:
                event.target.value,
            }))
          }
        >

          {senderCompanies.map(
            (company) => (

              <MenuItem
                key={company.id}
                value={company.id}
              >
                {company.name}
              </MenuItem>

            )
          )}

        </TextField>


        {/* ================================================
            BUYER ADDRESS - GEOAPIFY
        ================================================= */}

        <Box
          sx={{
            gridColumn: {
              xs: "auto",
              md: "1 / -1",
            },
          }}
        >

          <Autocomplete<
            AddressSuggestion,
            false,
            false,
            false
          >

            fullWidth

            open={
              addressDropdownOpen
            }

            onClose={() =>
              setAddressDropdownOpen(
                false
              )
            }

            value={
              selectedAddress
            }

            inputValue={
              addressInput
            }

            options={
              addressOptions
            }

            loading={
              addressLoading
            }

            /*
             * Geoapify already filtered
             * the results.
             *
             * Don't let MUI filter them
             * again.
             */
            filterOptions={(
              options
            ) => options}

            getOptionLabel={(
              option
            ) =>
              option.formatted
            }

            isOptionEqualToValue={(
              option,
              value
            ) =>
              option.id ===
              value.id
            }


            /* User types */

            onInputChange={(
              _event,
              newValue,
              reason
            ) => {

              setAddressInput(
                newValue
              );


              /*
               * If the user edits the
               * text after selecting an
               * address, invalidate the
               * previous selection.
               */
              if (
                reason === "input"
              ) {

                setSelectedAddress(
                  null
                );

                setAddressOptions(
                  []
                );

                setAddressApiError(
                  null
                );


                setForm(
                  (current) => ({
                    ...current,

                    buyerAddress: {
                      ...current
                        .buyerAddress,

                      address:
                        newValue,

                      postalCode:
                        "",

                      latitude: 0,
                      longitude: 0,
                    },
                  })
                );
              }
            }}


            /* User selects suggestion */

            onChange={(
              _event,
              newValue
            ) =>
              handleAddressSelected(
                newValue
              )
            }


            /* Address suggestion UI */

            renderOption={(
              props,
              option
            ) => (

              <Box
                component="li"

                {...props}

                key={option.id}

                sx={{
                  display: "flex",

                  alignItems:
                    "flex-start",

                  gap: 1.25,

                  py: 1,
                }}
              >

                <LocationOnOutlinedIcon
                  color="primary"

                  fontSize="small"

                  sx={{
                    mt: 0.25,
                    flexShrink: 0,
                  }}
                />


                <Box>

                  <Typography
                    variant="body2"

                  // fontWeight={600}
                  >
                    {
                      option.addressLine1
                    }
                  </Typography>


                  <Typography
                    variant="caption"

                    color="text.secondary"
                  >

                    {
                      [
                        option
                          .addressLine2,

                        option
                          .postalCode
                          ? `Singapore ${option.postalCode}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")
                    }

                  </Typography>

                </Box>

              </Box>

            )}


            /* Address input */

            renderInput={(
              params
            ) => (

              <TextField
                {...params}

                label="Buyer Address"

                placeholder={
                  "e.g. 17 Teck Whye or 680017"
                }

                error={Boolean(
                  errors.buyerAddress ||
                  addressApiError
                )}

                helperText={
                  errors.buyerAddress ??
                  addressApiError ??
                  "Enter an address and click search"
                }


                /*
                 * Pressing Enter also
                 * searches instead of
                 * submitting the form.
                 */
                onKeyDown={(
                  event
                ) => {

                  if (
                    event.key ===
                    "Enter"
                  ) {

                    event.preventDefault();

                    void handleAddressSearch();
                  }
                }}


                /*
                 * Current MUI Autocomplete
                 * provides input slot props.
                 *
                 * Preserve them when adding
                 * our search icon.
                 */
                slotProps={{
                  ...params.slotProps,

                  input: {
                    ...params
                      .slotProps
                      .input,

                    endAdornment: (
                      <>

                        {addressLoading ? (

                          <CircularProgress
                            size={20}
                          />

                        ) : (

                          <IconButton
                            size="small"

                            aria-label={
                              "Search address"
                            }

                            disabled={
                              addressInput
                                .trim()
                                .length < 3
                            }

                            onClick={(
                              event
                            ) => {

                              /*
                               * Prevent the
                               * autocomplete
                               * field itself
                               * from handling
                               * this click.
                               */
                              event.stopPropagation();

                              void handleAddressSearch();
                            }}
                          >

                            <SearchIcon />

                          </IconButton>

                        )}


                        {
                          params
                            .slotProps
                            .input
                            .endAdornment
                        }

                      </>
                    ),
                  },
                }}
              />

            )}
          />

        </Box>


        {/* UNIT NUMBER */}

        <TextField
          label="Unit Number"

          placeholder="#08-12"

          value={
            form.buyerAddress.unit
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              buyerAddress: {
                ...current.buyerAddress,

                unit:
                  event.target.value,
              },
            }))
          }
        />


        {/* POSTAL CODE */}

        <TextField
          label="Postal Code"

          disabled

          value={
            form.buyerAddress.postalCode
          }

          error={Boolean(
            errors.postalCode
          )}

          // helperText={
          //   errors.postalCode ??
          //   (
          //     selectedAddress
          //       ? "Filled from selected address"
          //       : undefined
          //   )
          // }

          slotProps={{
            htmlInput: {
              maxLength: 6,
              inputMode: "numeric",
            },
          }}

          onChange={(event) => {

            const postalCode =
              event.target.value
                .replace(/\D/g, "")
                .slice(0, 6);


            setForm(
              (current) => ({
                ...current,

                buyerAddress: {
                  ...current
                    .buyerAddress,

                  postalCode,
                },
              })
            );
          }}
        />


        {/* MAP */}

        {selectedAddress && (

          <Box
            sx={{
              gridColumn: {
                xs: "auto",
                md: "1 / -1",
              },
            }}
          >

            <AddressMap
              latitude={
                selectedAddress.latitude
              }

              longitude={
                selectedAddress.longitude
              }

              address={
                selectedAddress.formatted
              }
            />

          </Box>

        )}


        {/* CONTACT NUMBER */}

        <TextField
          label="Contact Number"

          placeholder="+65 9123 4567"

          value={
            form.contactNumber
          }

          error={Boolean(
            errors.contactNumber
          )}

          helperText={
            errors.contactNumber
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              contactNumber:
                event.target.value,
            }))
          }
        />


        {/* PARCEL TYPE */}

        <TextField
          select

          label="Parcel Type"

          value={
            form.parcelType
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              parcelType:
                event.target
                  .value as NewJobInput["parcelType"],
            }))
          }
        >

          {PARCEL_TYPES.map(
            (type) => (

              <MenuItem
                key={type}
                value={type}
              >
                {type}
              </MenuItem>

            )
          )}

        </TextField>


        {/* PARCEL SIZE */}

        <TextField
          select

          label="Parcel Size"

          value={
            form.parcelSize
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              parcelSize:
                event.target
                  .value as NewJobInput["parcelSize"],
            }))
          }
        >

          {PARCEL_SIZES.map(
            (size) => (

              <MenuItem
                key={size}
                value={size}
              >
                {size}
              </MenuItem>

            )
          )}

        </TextField>


        {/* DELIVERY DATE */}

        <TextField
          type="date"
          label="Delivery Date"
          value={form.deliveryDate}
          error={Boolean(errors.deliveryDate)}
          helperText={errors.deliveryDate}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: today,
            },
          }}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              deliveryDate: event.target.value,
            }))
          }
        />

        {/* NOTES */}

        <TextField
          label="Notes"

          multiline

          minRows={3}

          value={
            form.notes
          }

          onChange={(event) =>
            setForm((current) => ({
              ...current,

              notes:
                event.target.value,
            }))
          }
        />

      </Box>


      {/* BUTTONS */}

      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}

        spacing={1}

        sx={{
          mt: 3,

          justifyContent:
            "flex-end",
        }}
      >

        <Button
          type="button"

          onClick={
            onCancel
          }

          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Cancel
        </Button>


        <Button
          type="submit"

          variant="contained"

          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {submitLabel}
        </Button>

      </Stack>

    </Box>
  );
}