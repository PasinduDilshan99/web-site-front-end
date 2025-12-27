import React from 'react';
import { Tour } from '@/types/booking-types';
import { Card, CardHeader, CardTitle, CardContent, Label, Select, SelectItem, Button } from './BookingComponents';

interface BookingFilterSectionProps {
  tours: Tour[];
  selectedTourId: string;
  selectedPackageId: string;
  selectedScheduleId: string;
  selectedTour: Tour | undefined;
  selectedPackage: Tour['packageDetails'][0] | undefined;
  selectedSchedule: Tour['packageDetails'][0]['packageSchedulesDetails'][0] | undefined;
  onTourChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPackageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onScheduleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onProceedToForm: () => void;
}

const BookingFilterSection: React.FC<BookingFilterSectionProps> = ({
  tours,
  selectedTourId,
  selectedPackageId,
  selectedScheduleId,
  selectedTour,
  selectedPackage,
  selectedSchedule,
  onTourChange,
  onPackageChange,
  onScheduleChange,
  onProceedToForm
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Tour Package</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Tour Select */}
          <div>
            <Label htmlFor="tour">Tour</Label>
            <Select 
              id="tour"
              value={selectedTourId} 
              onChange={onTourChange}
            >
              <SelectItem value="">Select a tour</SelectItem>
              {tours.map(tour => (
                <SelectItem key={tour.tourId} value={tour.tourId.toString()}>
                  {tour.tourName}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Package Select */}
          <div>
            <Label htmlFor="package">Package</Label>
            <Select 
              id="package"
              value={selectedPackageId} 
              onChange={onPackageChange}
              disabled={!selectedTourId}
            >
              <SelectItem value="">Select a package</SelectItem>
              {selectedTour?.packageDetails.map(pkg => (
                <SelectItem key={pkg.packageId} value={pkg.packageId.toString()}>
                  {pkg.packageName}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Schedule Select */}
          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Select 
              id="schedule"
              value={selectedScheduleId} 
              onChange={onScheduleChange}
              disabled={!selectedPackageId}
            >
              <SelectItem value="">Select a schedule</SelectItem>
              {selectedPackage?.packageSchedulesDetails.map(schedule => (
                <SelectItem 
                  key={schedule.packageScheduleId} 
                  value={schedule.packageScheduleId.toString()}
                >
                  {schedule.packageScheduleName} ({schedule.startDate})
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Selected Schedule Info */}
        {selectedSchedule && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-lg mb-3 text-gray-900">Selected Schedule Details:</h3>
            <div className="space-y-2">
              <p className='text-purple-900'><strong className="text-gray-900">Name:</strong> {selectedSchedule.packageScheduleName}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Description:</strong> {selectedSchedule.packageScheduleDescription}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Dates:</strong> {selectedSchedule.startDate} to {selectedSchedule.endDate}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Tour:</strong> {selectedTour?.tourName}</p>
              <p className='text-purple-900'><strong className="text-gray-900">Package:</strong> {selectedPackage?.packageName}</p>
            </div>
            
            <Button 
              className="mt-4"
              onClick={onProceedToForm}
            >
              Proceed to Booking Form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingFilterSection;