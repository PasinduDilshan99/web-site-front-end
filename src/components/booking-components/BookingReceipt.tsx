import React from 'react';
import { ReceiptData, AccommodationDetail } from '@/types/booking-types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Separator 
} from './BookingComponents';
import { usePDF } from 'react-to-pdf';


interface BookingReceiptProps {
  receiptData: ReceiptData;
  onDownloadReceipt: () => void;
  onPrintReceipt: () => void;
  onNewBooking: () => void;
}

const calculateAccommodationTotalPerPerson = (accommodations: AccommodationDetail[]): number => {
  let totalAmount = 0.0;
  
  for (const p of accommodations) {
    const priceWithServiceCharge = p.price * (100.0 + p.serviceCharge) / 100;
    const discount = priceWithServiceCharge * p.discount / 100;
    const tax = priceWithServiceCharge * p.tax / 100;
    const total = priceWithServiceCharge - discount + tax + p.extraCharge + p.transportPrice;
    totalAmount += total;
  }
  
  return totalAmount;
};

const calculateActivityTotalPerPerson = (activities: ReceiptData['activityDetailsList']): number => {
  let totalAmount = 0.0;
  
  for (const p of activities) {
    totalAmount += p.pricePerPerson;
  }
  
  return totalAmount;
};

const calculateDestinationExtraTotalPerPerson = (destinations: ReceiptData['destiantionDetails']): number => {
  let totalAmount = 0.0;
  
  for (const p of destinations) {
    totalAmount += p.extraPrice;
  }
  
  return totalAmount;
};

const BookingReceipt: React.FC<BookingReceiptProps> = ({
  receiptData,
  onDownloadReceipt,
  onPrintReceipt,
  onNewBooking
}) => {
  const participantsCount = receiptData.participentDetails.length;
    const { toPDF, targetRef } = usePDF({
    filename: `receipt-${receiptData.bookingReference}.pdf`,
  });
  const activitiesTotalPerPerson = calculateActivityTotalPerPerson(receiptData.activityDetailsList);
  const destinationsTotalPerPerson = calculateDestinationExtraTotalPerPerson(receiptData.destiantionDetails);
  const accommodationsTotalPerPerson = calculateAccommodationTotalPerPerson(receiptData.accommodationDetailsList);
  
  const activitiesTotal = activitiesTotalPerPerson * participantsCount;
  const destinationsTotal = destinationsTotalPerPerson * participantsCount;
  const accommodationsTotal = accommodationsTotalPerPerson * participantsCount;

  const calculatedSubtotal = activitiesTotal + destinationsTotal + accommodationsTotal + receiptData.packagePrice;
  const subtotalDifference = calculatedSubtotal - receiptData.subtotal;

  return (
    <div id="receipt-content" ref={targetRef}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Booking Receipt</CardTitle>
            <div className="flex space-x-2">
              {/* Update the Download button to use toPDF */}
              <Button variant="outline" onClick={() => toPDF()}>
                Download PDF
              </Button>
              <Button variant="outline" onClick={onPrintReceipt}>
                Print Receipt
              </Button>
              <Button variant="outline" onClick={onNewBooking}>
                New Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div id="receipt-print-content" className="space-y-6 text-gray-900">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">BOOKING CONFIRMATION</h2>
              <p className="text-gray-700 mt-1">Receipt for Booking #{receiptData.bookingReference}</p>
            </div>

            {/* Booking Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p><strong className="text-gray-900">Booking ID:</strong> {receiptData.bookingId}</p>
                <p><strong className="text-gray-900">Reference:</strong> {receiptData.bookingReference}</p>
                <p><strong className="text-gray-900">Invoice:</strong> {receiptData.invoiceNumber}</p>
                <p><strong className="text-gray-900">Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    receiptData.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-900' :
                    receiptData.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-900' :
                    'bg-gray-100 text-gray-900'
                  }`}>
                    {receiptData.bookingStatus}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-gray-900">Invoice Date:</strong> {receiptData.invoiceDate}</p>
                <p><strong className="text-gray-900">Due Date:</strong> {receiptData.dueDate}</p>
                <p><strong className="text-gray-900">Booking Date:</strong> {receiptData.bookingDate}</p>
                <p><strong className="text-gray-900">Tour Dates:</strong> {receiptData.assumeStartDate} to {receiptData.assumeEndDate}</p>
              </div>
            </div>

            <Separator />

            {/* Tour Details */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Tour Details</h3>
              <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border border-purple-200">
                <p><strong className="text-gray-900">Tour:</strong> {receiptData.tourName}</p>
                <p><strong className="text-gray-900">Package:</strong> {receiptData.packageName}</p>
                <p><strong className="text-gray-900">Participants:</strong> {participantsCount} persons</p>
                <p className="text-gray-700 mt-2">{receiptData.tourDescription}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Price Breakdown</h3>
              <p className="text-gray-700 mb-4">
                <em>Note: Per person prices are multiplied by {participantsCount} participants</em>
              </p>
              
              {/* Package Price */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Package Price (Total)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-purple-300">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Item</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                        <th className="border border-purple-300 p-2 text-right text-gray-900">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-purple-50">
                        <td className="border border-purple-300 p-2 text-gray-900">Tour Package</td>
                        <td className="border border-purple-300 p-2 text-gray-900">{receiptData.tourName} - {receiptData.packageName}</td>
                        <td className="border border-purple-300 p-2 text-right text-gray-900">${receiptData.packagePrice.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activities Table */}
              {receiptData.activityDetailsList.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
                  <p className="text-gray-700 mb-2">
                    <em>Per Person: ${activitiesTotalPerPerson.toFixed(2)} | Total (x{participantsCount}): ${activitiesTotal.toFixed(2)}</em>
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Activity</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                          <th className="border border-purple-300 p-2 text-center text-gray-900">Participants</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Price/Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.activityDetailsList.map((activity, index) => (
                          <tr key={index} className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">{activity.activityName}</td>
                            <td className="border border-purple-300 p-2 text-gray-900">{activity.activityDescription}</td>
                            <td className="border border-purple-300 p-2 text-center text-gray-900">{activity.numberOfParticipants}</td>
                            <td className="border border-purple-300 p-2 text-right text-gray-900">${activity.pricePerPerson.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                          <td colSpan={3} className="border border-purple-300 p-2 text-right text-gray-900">Activities Total Per Person:</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${activitiesTotalPerPerson.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                          <td colSpan={3} className="border border-purple-300 p-2 text-right text-gray-900">Activities Total (x{participantsCount}):</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${activitiesTotal.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Destinations Table */}
              {receiptData.destiantionDetails.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Destinations</h4>
                  <p className="text-gray-700 mb-2">
                    <em>Per Person: ${destinationsTotalPerPerson.toFixed(2)} | Total (x{participantsCount}): ${destinationsTotal.toFixed(2)}</em>
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Destination</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Description</th>
                          <th className="border border-purple-300 p-2 text-center text-gray-900">Price/Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.destiantionDetails.map((destination, index) => (
                          <tr key={index} className="hover:bg-purple-50">
                            <td className="border border-purple-300 p-2 text-gray-900">{destination.destinationName}</td>
                            <td className="border border-purple-300 p-2 text-gray-900">{destination.destinationDescription}</td>
                            <td className="border border-purple-300 p-2 text-center text-gray-900">${destination.extraPrice.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                          <td colSpan={2} className="border border-purple-300 p-2 text-right text-gray-900">Destinations Total Per Person:</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${destinationsTotalPerPerson.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                          <td colSpan={2} className="border border-purple-300 p-2 text-right text-gray-900">Destinations Total (x{participantsCount}):</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${destinationsTotal.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Accommodation Table */}
              {receiptData.accommodationDetailsList.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Accommodation</h4>
                  <p className="text-gray-700 mb-2">
                    <em>Per Person: ${accommodationsTotalPerPerson.toFixed(2)} | Total (x{participantsCount}): ${accommodationsTotal.toFixed(2)}</em>
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-purple-300">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Day</th>
                          <th className="border border-purple-300 p-2 text-left text-gray-900">Hotel</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Price/Person</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Transport/Person</th>
                          <th className="border border-purple-300 p-2 text-right text-gray-900">Day Total/Person</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.accommodationDetailsList.map((accommodation, index) => {
                          const priceWithServiceCharge = accommodation.price * (100.0 + accommodation.serviceCharge) / 100;
                          const discount = priceWithServiceCharge * accommodation.discount / 100;
                          const tax = priceWithServiceCharge * accommodation.tax / 100;
                          const dayTotalPerPerson = priceWithServiceCharge - discount + tax + accommodation.extraCharge + accommodation.transportPrice;
                          
                          return (
                            <tr key={index} className="hover:bg-purple-50">
                              <td className="border border-purple-300 p-2 text-center text-gray-900">{accommodation.dayNumber}</td>
                              <td className="border border-purple-300 p-2 text-gray-900">{accommodation.hotelName}</td>
                              <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodation.price.toFixed(2)}</td>
                              <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodation.transportPrice.toFixed(2)}</td>
                              <td className="border border-purple-300 p-2 text-right font-medium text-gray-900">${dayTotalPerPerson.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                        <tr className="bg-gradient-to-r from-purple-100 to-amber-100 font-medium">
                          <td colSpan={4} className="border border-purple-300 p-2 text-right text-gray-900">Accommodation Total Per Person:</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodationsTotalPerPerson.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                          <td colSpan={4} className="border border-purple-300 p-2 text-right text-gray-900">Accommodation Total (x{participantsCount}):</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodationsTotal.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Summary Table */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-purple-300">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Category</th>
                        <th className="border border-purple-300 p-2 text-right text-gray-900">Per Person</th>
                        <th className="border border-purple-300 p-2 text-right text-gray-900">Total (x{participantsCount})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activitiesTotal > 0 && (
                        <tr className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-2 text-gray-900">Activities</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${activitiesTotalPerPerson.toFixed(2)}</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${activitiesTotal.toFixed(2)}</td>
                        </tr>
                      )}
                      {destinationsTotal > 0 && (
                        <tr className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-2 text-gray-900">Destinations</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${destinationsTotalPerPerson.toFixed(2)}</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${destinationsTotal.toFixed(2)}</td>
                        </tr>
                      )}
                      {accommodationsTotal > 0 && (
                        <tr className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-2 text-gray-900">Accommodation</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodationsTotalPerPerson.toFixed(2)}</td>
                          <td className="border border-purple-300 p-2 text-right text-gray-900">${accommodationsTotal.toFixed(2)}</td>
                        </tr>
                      )}
                      <tr className="bg-gradient-to-r from-purple-200 to-amber-200 font-medium">
                        <td className="border border-purple-300 p-2 text-gray-900">Calculated Subtotal</td>
                        <td className="border border-purple-300 p-2 text-right text-gray-900">
                          ${(activitiesTotalPerPerson + destinationsTotalPerPerson + accommodationsTotalPerPerson).toFixed(2)}
                        </td>
                        <td className="border border-purple-300 p-2 text-right text-gray-900">${calculatedSubtotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Final Price Summary */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Final Price Summary</h4>
                <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border border-purple-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900">Total Amount:</span>
                      <span className="font-medium text-gray-900">${receiptData.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Tax:</span>
                      <span className="font-medium text-gray-900">${receiptData.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Discount:</span>
                      <span className="font-medium text-gray-900">-${receiptData.discountAmount.toFixed(2)}</span>
                    </div>
                    {receiptData.insuranceAmount && (
                      <div className="flex justify-between">
                        <span className="text-gray-900">Insurance:</span>
                        <span className="font-medium text-gray-900">${receiptData.insuranceAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900">Sub Total Amount:</span>
                      <span className="text-purple-600">${receiptData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Amount Paid:</span>
                      <span className="font-medium text-gray-900">${receiptData.amountPaid.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900">Balance Due:</span>
                      <span className="text-red-600">${receiptData.balanceDue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Final Amount (incl. all charges):</span>
                      <span>${receiptData.finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants Table */}
            {receiptData.participentDetails.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Participants ({participantsCount})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-purple-300">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-50 to-amber-50">
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Name</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Date of Birth</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Gender</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Passport</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Contact</th>
                        <th className="border border-purple-300 p-2 text-left text-gray-900">Medical Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receiptData.participentDetails.map((participant, index) => (
                        <tr key={index} className="hover:bg-purple-50">
                          <td className="border border-purple-300 p-2 text-gray-900">
                            {participant.firstName} {participant.lastName}
                          </td>
                          <td className="border border-purple-300 p-2 text-gray-900">{participant.dateOfBirth}</td>
                          <td className="border border-purple-300 p-2 text-gray-900">{participant.gender}</td>
                          <td className="border border-purple-300 p-2 text-gray-900">{participant.passportNumber}</td>
                          <td className="border border-purple-300 p-2 text-gray-900">
                            <div>{participant.email}</div>
                            <div>{participant.mobileNumber}</div>
                          </td>
                          <td className="border border-purple-300 p-2 text-gray-900">
                            <div><strong>Medical:</strong> {participant.medicalConditions}</div>
                            <div><strong>Allergies:</strong> {participant.allergies}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-gray-700 mt-6 pt-6 border-t border-purple-200">
              <p>For any queries, please contact our customer service.</p>
              <p className="mt-1">Thank you for choosing our services!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingReceipt;