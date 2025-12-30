"use client";
import React from "react";
import {
  Tour,
  BookingFormData,
  Participant,
  BookingPrice,
  Activity,
  BookingNote,
} from "@/types/booking-types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Label,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Switch,
} from "./BookingComponents";

interface BookingFormProps {
  formData: BookingFormData;
  selectedTour: Tour | undefined;
  selectedPackage: Tour["packageDetails"][0] | undefined;
  selectedSchedule:
    | Tour["packageDetails"][0]["packageSchedulesDetails"][0]
    | undefined;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTransportChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInvoiceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onParticipantChange: (
    index: number,
    field: keyof Participant,
    value: string | boolean
  ) => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (index: number) => void;
  //   onBookingPriceChange: (index: number, field: keyof BookingPrice, value: string | number) => void;
  //   onAddBookingPrice: () => void;
  //   onRemoveBookingPrice: (index: number) => void;
  //   onActivityChange: (index: number, field: keyof Activity, value: number) => void;
  //   onAddActivity: () => void;
  //   onRemoveActivity: (index: number) => void;
  onBookingNoteChange: (
    index: number,
    field: keyof BookingNote,
    value: string
  ) => void;
  onAddBookingNote: () => void;
  onRemoveBookingNote: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToSelection: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  selectedTour,
  selectedPackage,
  selectedSchedule,
  onInputChange,
  onTransportChange,
  onInvoiceChange,
  onParticipantChange,
  onAddParticipant,
  onRemoveParticipant,
  //   onBookingPriceChange,
  //   onAddBookingPrice,
  //   onRemoveBookingPrice,
  //   onActivityChange,
  //   onAddActivity,
  //   onRemoveActivity,
  onBookingNoteChange,
  onAddBookingNote,
  onRemoveBookingNote,
  onSubmit,
  onBackToSelection,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Package Info */}
      <Card>
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tour Name</Label>
              <Input value={selectedTour?.tourName || ""} readOnly />
            </div>
            <div>
              <Label>Package Name</Label>
              <Input value={selectedPackage?.packageName || ""} readOnly />
            </div>
            <div>
              <Label>Schedule Name</Label>
              <Input
                value={selectedSchedule?.packageScheduleName || ""}
                readOnly
              />
            </div>
            <div>
              <Label>Package Schedule ID</Label>
              <Input
                name="packageScheduleId"
                value={formData.packageScheduleId}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={onInputChange}
              placeholder="Any special requirements..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Input
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={onInputChange}
              placeholder="e.g., Vegetarian, Vegan, Gluten-free"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="insuranceRequired"
              checked={formData.insuranceRequired}
              onCheckedChange={(checked: boolean) => {
                // Create a proper event-like object that matches the expected type
                const syntheticEvent = {
                  target: {
                    name: "insuranceRequired",
                    value: checked.toString(),
                    type: "checkbox",
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                onInputChange(syntheticEvent);
              }}
            />
            <Label htmlFor="insuranceRequired">Travel Insurance Required</Label>
          </div>
        </CardContent>
      </Card>

      {/* Transport Details */}
      <Card>
        <CardHeader>
          <CardTitle>Transport Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.transport.departureDate}
                onChange={onTransportChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                type="time"
                id="departureTime"
                name="departureTime"
                value={formData.transport.departureTime}
                onChange={onTransportChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="arrivalDate">Arrival Date</Label>
              <Input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={formData.transport.arrivalDate}
                onChange={onTransportChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input
                type="time"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.transport.arrivalTime}
                onChange={onTransportChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="departureLocation">Departure Location</Label>
              <Input
                id="departureLocation"
                name="departureLocation"
                value={formData.transport.departureLocation}
                onChange={onTransportChange}
                placeholder="e.g., Colombo"
                required
              />
            </div>

            <div>
              <Label htmlFor="arrivalLocation">Arrival Location</Label>
              <Input
                id="arrivalLocation"
                name="arrivalLocation"
                value={formData.transport.arrivalLocation}
                onChange={onTransportChange}
                placeholder="e.g., Ella"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Prices */}
      {/* <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Prices</CardTitle>
            <Button type="button" variant="outline" onClick={onAddBookingPrice}>
              + Add Price Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.bookingPrices.map((price, index) => (
            <div key={index} className="mb-6 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Price Item {index + 1}</h4>
                {formData.bookingPrices.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveBookingPrice(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Item Type</Label>
                  <Select
                    value={price.itemType}
                    onChange={(e) => onBookingPriceChange(index, 'itemType', e.target.value)}
                  >
                    <SelectItem value="PACKAGE">Package</SelectItem>
                    <SelectItem value="EXTRA">Extra</SelectItem>
                    <SelectItem value="INSURANCE">Insurance</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Label>Item Name</Label>
                  <Input
                    value={price.itemName}
                    onChange={(e) => onBookingPriceChange(index, 'itemName', e.target.value)}
                    placeholder="e.g., Hotel Upgrade"
                  />
                </div>
                
                <div>
                  <Label>Item Description</Label>
                  <Input
                    value={price.itemDescription}
                    onChange={(e) => onBookingPriceChange(index, 'itemDescription', e.target.value)}
                    placeholder="Description"
                  />
                </div>
                
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={price.quantity}
                    onChange={(e) => onBookingPriceChange(index, 'quantity', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Unit Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price.unitPrice}
                    onChange={(e) => onBookingPriceChange(index, 'unitPrice', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Total Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price.totalPrice}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* Participants */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Participants</CardTitle>
            <Button type="button" variant="outline" onClick={onAddParticipant}>
              + Add Participant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.participants.map((participant, index) => (
            <div
              key={index}
              className="mb-6 p-4 border border-purple-300 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">
                  Participant {index + 1}
                </h4>
                {formData.participants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveParticipant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={participant.firstName}
                    onChange={(e) =>
                      onParticipantChange(index, "firstName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={participant.lastName}
                    onChange={(e) =>
                      onParticipantChange(index, "lastName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={participant.dateOfBirth}
                    onChange={(e) =>
                      onParticipantChange(index, "dateOfBirth", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select
                    value={participant.gender}
                    onChange={(e) =>
                      onParticipantChange(index, "gender", e.target.value)
                    }
                  >
                    <SelectItem value="">Select gender</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </Select>
                </div>

                <div>
                  <Label>Passport Number</Label>
                  <Input
                    value={participant.passportNumber}
                    onChange={(e) =>
                      onParticipantChange(
                        index,
                        "passportNumber",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input
                    value={participant.country}
                    onChange={(e) =>
                      onParticipantChange(index, "country", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={participant.email}
                    onChange={(e) =>
                      onParticipantChange(index, "email", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Mobile Number</Label>
                  <Input
                    value={participant.mobileNumber}
                    onChange={(e) =>
                      onParticipantChange(index, "mobileNumber", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input
                    value={participant.emergencyContactName}
                    onChange={(e) =>
                      onParticipantChange(
                        index,
                        "emergencyContactName",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Emergency Contact Phone</Label>
                  <Input
                    value={participant.emergencyContactPhone}
                    onChange={(e) =>
                      onParticipantChange(
                        index,
                        "emergencyContactPhone",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Emergency Contact Relationship</Label>
                  <Input
                    value={participant.emergencyContactRelationship}
                    onChange={(e) =>
                      onParticipantChange(
                        index,
                        "emergencyContactRelationship",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Medical Conditions</Label>
                  <Input
                    value={participant.medicalConditions}
                    onChange={(e) =>
                      onParticipantChange(
                        index,
                        "medicalConditions",
                        e.target.value
                      )
                    }
                    placeholder="None"
                  />
                </div>

                <div>
                  <Label>Allergies</Label>
                  <Input
                    value={participant.allergies}
                    onChange={(e) =>
                      onParticipantChange(index, "allergies", e.target.value)
                    }
                    placeholder="None"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    checked={participant.specialAssistanceRequired}
                    onCheckedChange={(checked: boolean) =>
                      onParticipantChange(
                        index,
                        "specialAssistanceRequired",
                        checked
                      )
                    }
                  />
                  <Label>Special Assistance Required?</Label>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activities */}
      {/* <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Activities</CardTitle>
            <Button type="button" variant="outline" onClick={onAddActivity}>
              + Add Activity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.activities.map((activity, index) => (
            <div key={index} className="mb-4 p-4 border border-purple-300 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Activity {index + 1}</h4>
                {formData.activities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveActivity(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Activity Schedule ID</Label>
                  <Input
                    type="number"
                    value={activity.activityScheduleId}
                    onChange={(e) => onActivityChange(index, 'activityScheduleId', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Number of Participants</Label>
                  <Input
                    type="number"
                    min="1"
                    value={activity.numberOfParticipants}
                    onChange={(e) => onActivityChange(index, 'numberOfParticipants', parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* Booking Notes */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Notes</CardTitle>
            <Button type="button" variant="outline" onClick={onAddBookingNote}>
              + Add Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.bookingNotes.map((note, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-purple-300 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Note {index + 1}</h4>
                {formData.bookingNotes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveBookingNote(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Note Type</Label>
                  <Select
                    value={note.noteType}
                    onChange={(e) =>
                      onBookingNoteChange(index, "noteType", e.target.value)
                    }
                  >
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="AGENT">Agent</SelectItem>
                    <SelectItem value="SYSTEM">System</SelectItem>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>Note Text</Label>
                  <Textarea
                    value={note.noteText}
                    onChange={(e) =>
                      onBookingNoteChange(index, "noteText", e.target.value)
                    }
                    placeholder="Enter note here..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="billingFullName">Full Name</Label>
              <Input
                id="billingFullName"
                name="billingFullName"
                value={formData.invoices.billingFullName}
                onChange={onInvoiceChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="billingEmail">Email</Label>
              <Input
                id="billingEmail"
                name="billingEmail"
                type="email"
                value={formData.invoices.billingEmail}
                onChange={onInvoiceChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="billingPhone">Phone</Label>
              <Input
                id="billingPhone"
                name="billingPhone"
                value={formData.invoices.billingPhone}
                onChange={onInvoiceChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="billingAddress">Address</Label>
              <Textarea
                id="billingAddress"
                name="billingAddress"
                value={formData.invoices.billingAddress}
                onChange={onInvoiceChange}
                rows={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onBackToSelection}>
          Back to Selection
        </Button>
        <Button type="submit">Submit Booking</Button>
      </div>
    </form>
  );
};

export default BookingForm;
